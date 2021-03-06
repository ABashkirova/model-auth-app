package xyz.sashenka.modelauthapp.service

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.gherkin.Feature
import xyz.sashenka.modelauthapp.model.domain.UserSession
import xyz.sashenka.modelauthapp.model.dto.db.DBAccess
import xyz.sashenka.modelauthapp.model.dto.db.DBUser
import xyz.sashenka.modelauthapp.repository.SessionRepository

object AccountingServiceSpec : Spek({
    lateinit var accountingService: AccountingServiceImpl
    val sessionRepositoryMock = mockk<SessionRepository>()
    val access = DBAccess(0, DBUser(), "", "")
    val session = UserSession("", "", "", "", 0)
    every { sessionRepositoryMock.addSession(access, session) } returns Unit

    Feature("Accounting") {
        Scenario("login is valid") {

            Given("set repository") {
                accountingService = AccountingServiceImpl()
                accountingService.sessionRepository = sessionRepositoryMock
            }
            Then("check addSession") {
                accountingService.saveSession(access, session)
                verify {
                    sessionRepositoryMock.addSession(access, session)
                }
            }
        }
    }
})
