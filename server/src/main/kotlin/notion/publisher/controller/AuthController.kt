package notion.publisher.controller

import notion.publisher.dto.AuthResponse
import notion.publisher.service.AuthService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("auth")
class AuthController(
    private val authService: AuthService
) {

    @GetMapping
    fun getAuth(
        @RequestParam code: String,
    ): AuthResponse {
        return authService.getAuth(code)
    }
}