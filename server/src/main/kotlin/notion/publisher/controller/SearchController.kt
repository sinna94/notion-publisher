package notion.publisher.controller

import notion.publisher.NOTION_API
import notion.publisher.dto.SearchResponse
import notion.publisher.getBearerToken
import notion.publisher.postRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("search")
class SearchController {

    @GetMapping
    fun searchPage(
        @RequestParam accessToken: String,
        @RequestParam(required = false) query: String?
    ): SearchResponse {
        val url = "$NOTION_API/search"

        return postRequest(url, emptyMap(), getBearerToken(accessToken), SearchResponse::class.java)
    }
}