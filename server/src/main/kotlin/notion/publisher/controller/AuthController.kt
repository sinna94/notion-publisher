package notion.publisher.controller

import notion.publisher.NOTION_API
import notion.publisher.dto.AuthResponse
import notion.publisher.getBasicToken
import notion.publisher.postRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

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
    ): AuthResponse {
        val url = "$NOTION_API/oauth/token"
        val body = mapOf("grant_type" to "authorization_code", "code" to code, "redirect_uri" to redirectUri)

        return postRequest(url, body, getBasicToken(basicToken), AuthResponse::class.java)
    }
}