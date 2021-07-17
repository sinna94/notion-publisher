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
        query: String?
    ): SearchResponse {
        val url = "$NOTION_API/search"
        val data = mutableMapOf<String, String>()

        if (!query.isNullOrEmpty()){
            data["query"] = query
        }

        return postRequest(url, data, getBearerToken(accessToken), SearchResponse::class.java)
    }
}