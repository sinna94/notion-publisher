package notion.publisher.dto

data class AuthResponse(
    val accessToken: String = "",
    val workspaceName: String = "",
    val workspaceIcon: String = "",
    val botId: String = "",
    val tokenType: String = "",
    val workspaceId: String = "",
    val owner: Owner = Owner(true, ""),
):NotionError()

data class Owner(
    val workspace: Boolean,
    val type: String,
)