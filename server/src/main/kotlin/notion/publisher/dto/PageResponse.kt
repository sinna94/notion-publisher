package notion.publisher.dto

data class PageResponse(
    val `object`: String = "page",
    val id: String = "",
    val createdTime: String = "",
    val lastEditedTime: String = "",
    val archived: Boolean = false,
    val properties: Any = Any(),
    val parent: Any = Any(),
    val url: String = ""
)
