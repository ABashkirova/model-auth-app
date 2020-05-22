package xyz.sashenka.modelauthapp.service

import com.google.inject.Inject
import xyz.sashenka.modelauthapp.model.domain.UsersResources
import xyz.sashenka.modelauthapp.model.dto.db.DBAccess
import xyz.sashenka.modelauthapp.repository.ResourceRepository

class AuthorizationService(
    @Inject private val resourceRepository: ResourceRepository
) {
    fun checkAccess(usersResource: UsersResources): Boolean {
        val access = resourceRepository.getResourcesByUserLogin(usersResource)
        return access != null
    }

    fun getResourceAccess(usersResource: UsersResources): DBAccess? =
        resourceRepository.getResourcesByUserLogin(usersResource)
}
