package notion.publisher.service

import notion.publisher.NOTION_API
import notion.publisher.dto.AuthResponse
import notion.publisher.getBasicToken
import notion.publisher.postRequest
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class AuthService {

    @Value("\${notion.basic-token}")
    lateinit var basicToken: String

    @Value("\${notion.redirect-uri}")
    lateinit var redirectUri: String

    fun getAuth(
        code: String,
    ): AuthResponse {
        val url = "$NOTION_API/oauth/token"
        val body = mapOf("grant_type" to "authorization_code", "code" to code, "redirect_uri" to redirectUri)

        return postRequest(url, body, getBasicToken(basicToken), AuthResponse::class.java)
    }
}