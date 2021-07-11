package notion.publisher.dto

data class SearchResponse (
    val hasMore: Boolean,
    val nextCursor: String?,
    val `object`: String,
    val results: List<Any>
)
