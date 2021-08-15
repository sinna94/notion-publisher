package notion.publisher

fun getBasicToken(token: String): String {
    return "Basic $token"
}

fun getBearerToken(token: String): String{
    return "Bearer $token"
}