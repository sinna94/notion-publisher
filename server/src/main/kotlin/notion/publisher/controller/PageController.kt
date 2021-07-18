package notion.publisher.controller

import notion.publisher.dto.Block
import notion.publisher.service.PageService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("page")
class PageController(
    private val pageService: PageService
) {

    @GetMapping
    fun getPage(
        @RequestParam accessToken: String,
        @RequestParam pageId: String,
    ): Block {
        return pageService.getPageContent(accessToken, pageId)
    }
}