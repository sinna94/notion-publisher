package notion.publisher.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.KotlinModule
import notion.publisher.dto.AuthResponse
import notion.publisher.service.AuthService
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.skyscreamer.jsonassert.JSONAssert
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(AuthController::class)
internal class AuthControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var authService: AuthService

    @Test
    fun getAuth() {
        `when`(authService.getAuth("code"))
            .thenReturn(
                AuthResponse(
                    "token",
                    "workspace",
                    "icon",
                    "bot",
                    "BEARER"
                )
            )

        val request = MockMvcRequestBuilders.get("/auth?code=code")
            .accept(MediaType.APPLICATION_JSON)

        val result = mockMvc.perform(request)
            .andExpect(status().isOk)
            .andReturn()

        val expectedResponse =
            ObjectMapper().registerModule(KotlinModule()).writerWithDefaultPrettyPrinter().writeValueAsString(
                AuthResponse("token", "workspace", "icon", "bot", "BEARER")
            )

        JSONAssert.assertEquals(expectedResponse, result.response.contentAsString, true)
    }
}