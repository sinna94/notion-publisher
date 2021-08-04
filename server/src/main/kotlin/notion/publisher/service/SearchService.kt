package notion.publisher.service

import notion.publisher.NOTION_API
import notion.publisher.dto.SearchResponse
import notion.publisher.getBearerToken
import notion.publisher.postRequest
import org.springframework.stereotype.Service

@Service
class SearchService {
    fun searchPage(
        accessToken: String,
        query: String?,
        nextCursor: String?
    ): SearchResponse {
        val url = "$NOTION_API/search"
        val data = mutableMapOf<String, String>()

        if (!query.isNullOrEmpty()) {
            data["query"] = query
        }

        if(!nextCursor.isNullOrEmpty()){
            data["start_cursor"] = nextCursor
        }

        val searchResponse = postRequest(url, data, getBearerToken(accessToken), SearchResponse::class.java)
        return SearchResponse(
            searchResponse.hasMore,
            searchResponse.nextCursor,
            searchResponse.`object`,
            searchResponse.results.filter { it.`object` == "page" }
        )
    }
}