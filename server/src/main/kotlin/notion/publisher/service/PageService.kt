package notion.publisher.service

import notion.publisher.NOTION_API
import notion.publisher.dto.Block
import notion.publisher.dto.BlockType
import notion.publisher.getRequest
import org.springframework.stereotype.Service

@Service
class PageService {

    private val url = "$NOTION_API/blocks"

    fun requestPageContent(pageId: String, token: String): Block {
        return getRequest("$url/$pageId/children", emptyMap(), token, Block::class.java)
    }

    fun getChildContent(token: String, block: Block) {
        block.results.forEach {
            if (it.hasChildren) {
                val child = requestPageContent(it.id, token)
                if (child.type !== BlockType.child_page) {
                    getChildContent(token, child)
                    it.childrenList.add(child)
                }
            }
        }
    }

    fun getPageContent(token: String, pageId: String): Block {
        val block = requestPageContent(pageId, token)

        getChildContent(token, block)

        return block
    }
}