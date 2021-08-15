package notion.publisher.service

import notion.publisher.NOTION_API
import notion.publisher.dto.Block
import notion.publisher.dto.BlockType
import notion.publisher.util.getRequest
import notion.publisher.util.Log
import org.springframework.stereotype.Service

@Service
class PageService {
    companion object : Log()

    private val url = "$NOTION_API/blocks"

    fun requestPageContent(pageId: String, token: String): Block {
        return getRequest("$url/$pageId/children", emptyMap(), token, Block::class.java)
    }

    fun getChildContent(token: String, block: Block) {
        block.results.forEach {
            if (it.hasChildren && it.type !== BlockType.child_page) {
                val child = requestPageContent(it.id, token)
                getChildContent(token, child)
                it.childrenList.add(child)
            }
        }
    }

    fun getPageContent(token: String, pageId: String): Block {
        logger().info("Start get Page Info : $pageId")
        val block = requestPageContent(pageId, token)

        logger().info("get Child Content : $pageId")
        getChildContent(token, block)

        logger().info("Finish get Page Info : $pageId")
        return block
    }
}