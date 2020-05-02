package xyz.sashenka.webapplication.servlets

import com.google.gson.Gson
import com.google.inject.Inject
import com.google.inject.Singleton
import org.apache.logging.log4j.kotlin.KotlinLogger
import xyz.sashenka.modelauthapp.dao.ResourceDAO
import xyz.sashenka.webapplication.di.logger.InjectLogger
import java.io.IOException
import javax.servlet.ServletException
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Singleton
class AuthorityServlet : HttpServlet() {
    @Inject
    lateinit var gson: Gson
    @Inject
    lateinit var resourceDAO: ResourceDAO
    @InjectLogger
    lateinit var logger: KotlinLogger

    @Throws(ServletException::class, IOException::class)
    override fun service(request: HttpServletRequest, response: HttpServletResponse) {
        //val json = gson.toJson("AuthorityServlet. Method: ${request.method}".split(" "))
        //response.writer.write(json)
        val query = request.queryString
        var json:String? = null
        when {
            query.isNullOrEmpty() -> {
                json = gson.toJson(resourceDAO.requestAllAccesses())
            }
            query.contains("id") -> {
                try {
                    val id = request.getParameter("id").toInt()
                    json = gson.toJson(resourceDAO.requestAccessById(id))
                } catch (e: NumberFormatException) {
                    response.sendError(400, e.message)
                }
            }
            query.contains("userId") -> {
                try {
                    val userId = request.getParameter("userId").toInt()
                    json = gson.toJson(resourceDAO.requestAccessByUserId(userId))
                } catch (e: NumberFormatException) {
                    response.sendError(400, e.message)
                }
            }
            else -> {
                response.sendError(404)
            }
        }
        if(json != null) response.writer.write(json)
    }
}
