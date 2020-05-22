package xyz.sashenka.modelauthapp.di

import com.google.inject.Injector
import org.apache.logging.log4j.kotlin.KotlinLogger
import org.apache.logging.log4j.kotlin.loggerOf
import xyz.sashenka.modelauthapp.controller.ArgHandler
import xyz.sashenka.modelauthapp.service.AuthenticationService
import xyz.sashenka.modelauthapp.service.AuthorizationService
import xyz.sashenka.modelauthapp.service.HelpService
import xyz.sashenka.modelauthapp.service.ValidatingService
import xyz.sashenka.modelauthapp.service.AccountingService

class Container(
    private val injector: Injector
) {

    fun getLogger(ofClass: Class<*>): KotlinLogger = loggerOf(ofClass)

    fun getArgHandler(): ArgHandler = injector.getInstance(ArgHandler::class.java)

    fun getValidatingService(): ValidatingService = injector.getInstance(ValidatingService::class.java )

    fun getHelpService(): HelpService = injector.getInstance(HelpService::class.java)

    fun getAuthenticationService(): AuthenticationService? =injector.getInstance(AuthenticationService::class.java)

    fun getAuthorizationService(): AuthorizationService? = injector.getInstance(AuthorizationService::class.java)

    fun getAccountingService(): AccountingService? = injector.getInstance(AccountingService::class.java)

}
