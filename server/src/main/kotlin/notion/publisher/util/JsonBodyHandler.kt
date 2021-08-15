package notion.publisher.util

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.module.kotlin.KotlinModule
import notion.publisher.dto.NotionError
import notion.publisher.exception.NotionException
import java.io.IOException
import java.io.InputStream
import java.io.UncheckedIOException
import java.lang.Exception
import java.net.http.HttpResponse
import java.net.http.HttpResponse.BodySubscriber
import java.util.function.Supplier


private fun <W> asJSON(targetType: Class<W>): BodySubscriber<Supplier<W>> {
    val upstream = HttpResponse.BodySubscribers.ofInputStream()
    return HttpResponse.BodySubscribers.mapping(
        upstream
    ) { inputStream: InputStream ->
        toSupplierOfType(
            inputStream,
            targetType
        )
    }
}

private fun <W> toSupplierOfType(inputStream: InputStream, targetType: Class<W>): Supplier<W> {
    return Supplier {
        inputStream.use { stream ->
            val objectMapper =
                ObjectMapper()
                    .registerModule(KotlinModule(nullIsSameAsDefault = true))
                    .setPropertyNamingStrategy(
                        PropertyNamingStrategies.SNAKE_CASE
                    )
            try {
                return@Supplier objectMapper.readValue(stream, targetType)
            } catch (e: IOException) {
                throw UncheckedIOException(e)
            }
        }
    }
}

class JsonBodyHandler<W>(
    private val wClass: Class<W>
) : HttpResponse.BodyHandler<Supplier<W>> {

    override fun apply(responseInfo: HttpResponse.ResponseInfo): BodySubscriber<Supplier<W>> {
        return asJSON(wClass)
    }
}