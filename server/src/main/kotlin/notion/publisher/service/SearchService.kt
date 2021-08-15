package notion.publisher.service

import notion.publisher.NOTION_API
import notion.publisher.dto.SearchResponse
import notion.publisher.getBearerToken
import notion.publisher.util.postRequest
import notion.publisher.util.Log
import org.springframework.stereotype.Service

@Service
class SearchService {

    companion object: Log()

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

        logger().info("start search page content : $data")

        val searchResponse = postRequest(url, data, getBearerToken(accessToken), SearchResponse::class.java)

        logger().info("finish search page content : $data")

        return SearchResponse(
            searchResponse.hasMore,
            searchResponse.nextCursor,
            searchResponse.`object`,
            searchResponse.results.filter { it.`object` == "page" }
        )
    }
}