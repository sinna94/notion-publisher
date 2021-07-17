package notion.publisher

import com.fasterxml.jackson.databind.ObjectMapper
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest

private fun createHttpRequest(url: String, token: String): HttpRequest.Builder {
    return HttpRequest.newBuilder()
        .uri(
            URI.create(url)
        )
        .header("Content-Type", "application/json")
        .header("Authorization", token)
        .header("Notion-Version", NOTION_VERSION)
}

fun <T> postRequest(url: String, body: Map<String, String>, token: String, cls: Class<T>): T {

    val objectMapper = ObjectMapper().writerWithDefaultPrettyPrinter()

    val requestBody = objectMapper.writeValueAsString(body)

    val request = createHttpRequest(url, token)
        .POST(
            HttpRequest.BodyPublishers.ofString(requestBody)
        )
        .build()

    val response = HttpClient.newHttpClient().send(request, JsonBodyHandler(cls))

    return response.body().get()
}

fun <T> getRequest(url: String, params: Map<String, String>, token: String, cls: Class<T>): T {

    val urlWithParams = if (params.count() > 0) {
        url + "?" + params.map { "${it.key}=${it.value}" }.joinToString("&")
    } else {
        url
    }

    val request = createHttpRequest(urlWithParams, token)
        .GET()
        .build()

    val response = HttpClient.newHttpClient().send(request, JsonBodyHandler(cls))

    return response.body().get()
}
