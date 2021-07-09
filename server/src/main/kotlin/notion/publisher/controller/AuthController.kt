package notion.publisher.controller

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.*
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

@RestController
@RequestMapping("auth")
class AuthController {

    @Value("\${notion.basic-token}")
    lateinit var basicToken: String

    @Value("\${notion.redirect-uri}")
    lateinit var redirectUri: String

    @GetMapping
    fun getAuth(
        @RequestParam code: String
    ): Map<*, *> {
        val url = "https://api.notion.com/v1/oauth/token"

        val body = mapOf("grant_type" to "authorization_code", "code" to code, "redirect_uri" to redirectUri)
        val requestBody = ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(body)
        val request = HttpRequest.newBuilder()
            .uri(
                URI.create(url)
            )
            .header("Content-Type", "application/json")
            .header("Authorization", "Basic $basicToken")
            .POST(
                HttpRequest.BodyPublishers.ofString(requestBody)
            )
            .build()

        var responseBody = ""
        HttpClient.newHttpClient().sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenAcceptAsync { responseBody = it.body() }

        println(requestBody)

        return ObjectMapper().readValue(requestBody, Map::class.java)
    }
}