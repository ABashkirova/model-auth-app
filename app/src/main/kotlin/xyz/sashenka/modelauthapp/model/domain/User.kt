package xyz.sashenka.modelauthapp.model.domain

data class User(
    val login: String,
    val hash: String,
    val salt: String
)
