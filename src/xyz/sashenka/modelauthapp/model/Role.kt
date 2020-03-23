package xyz.sashenka.modelauthapp.model

enum class Role {
    READ, WRITE, EXECUTE;

    companion object {
        fun getNames() = values().map { it.name }
    }
}