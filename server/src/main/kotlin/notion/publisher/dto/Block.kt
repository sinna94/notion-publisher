package notion.publisher.dto

data class Block(
    val `object`: String = "block",
    val id: String = "",
    val type: BlockType = BlockType.paragraph,
    val createdTime: String = "",
    val lastEditedTime: String = "",
    val url: String = "",
    val hasChildren: Boolean = false,
    val childrenList: MutableList<Block> = mutableListOf(),
    val results: List<Block> = emptyList(),
    val nextCursor: String? = null,
    val hasMore: Boolean = false,
    val paragraph: Any? = null,
    val heading_1: Any? = null,
    val heading_2: Any? = null,
    val heading_3: Any? = null,
    val bulletedListItem: Any? = null,
    val numberedListItem: Any? = null,
    val toggle: Any? = null,
    val toDo: Any? = null,
    val unsupported: Any? = null,
    val childPage: Any? = null,
    val image: Any? = null,
)

enum class BlockType {
    paragraph,
    heading_1,
    heading_2,
    heading_3,
    bulleted_list_item,
    numbered_list_item,
    to_do,
    toggle,
    child_page,
    unsupported
}
