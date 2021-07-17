package notion.publisher.service

import notion.publisher.NOTION_API
import notion.publisher.dto.PageResponse
import notion.publisher.getRequest
import org.springframework.stereotype.Service

@Service
class PageService {

    private val url = "$NOTION_API/blocks"

    fun getPage(token: String, pageId: String): Any {
        return getRequest("$url/$pageId/children", emptyMap(), token, Any::class.java)
    }
}