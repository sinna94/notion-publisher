package notion.publisher.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.KotlinModule
import notion.publisher.dto.SearchResponse
import notion.publisher.service.SearchService
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.mockito.Mockito
import org.skyscreamer.jsonassert.JSONAssert
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@WebMvcTest(SearchController::class)
internal class SearchControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var searchService: SearchService

    @Test
    fun searchPage() {
        Mockito.`when`(searchService.searchPage("token", null, null))
            .thenReturn(
                SearchResponse(false, null, "", emptyList())
            )

        val request = MockMvcRequestBuilders.get("/search?accessToken=token")
            .accept(MediaType.APPLICATION_JSON)

        val result = mockMvc.perform(request)
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andReturn()

        val expectedResponse =
            ObjectMapper().registerModule(KotlinModule()).writerWithDefaultPrettyPrinter().writeValueAsString(
                SearchResponse(false, null, "", emptyList())
            )

        JSONAssert.assertEquals(expectedResponse, result.response.contentAsString, true)
    }
}