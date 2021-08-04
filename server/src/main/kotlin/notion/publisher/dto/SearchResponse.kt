package notion.publisher.dto

data class SearchResponse(
    val hasMore: Boolean = false,
    val nextCursor: String? = null,
    val `object`: String = "",
    val results: List<Result> = emptyList()
)

data class Result(
    val `object`: String = "",
    val archived: Boolean = false,
    val created_time: String = "",
    val id: String = "",
    val last_edited_time: String = "",
    val parent: Any = Any(),
    val properties: Any = Any(),
    val url: String = "",
    val title: List<Any> = emptyList()
)