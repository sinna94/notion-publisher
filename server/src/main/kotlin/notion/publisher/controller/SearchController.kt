package notion.publisher.controller

import notion.publisher.dto.SearchResponse
import notion.publisher.service.SearchService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("search")
class SearchController(
    private val searchService: SearchService
) {

    @GetMapping
    fun searchPage(
        @RequestParam accessToken: String,
        @RequestParam(required = false) query: String?
    ): SearchResponse {
        return searchService.searchPage(accessToken, query)
    }
}