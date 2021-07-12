package notion.publisher.dto

data class SearchResponse (
    val hasMore: Boolean = false,
    val nextCursor: String? = null,
    val `object`: String = "",
    val results: List<Any> = emptyList()
)
