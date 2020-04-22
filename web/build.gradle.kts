// web
plugins {
    id("org.gretty") version "3.0.2"
    id("com.github.johnrengelman.shadow") version "5.1.0"
    war
    jacoco
    application
}

application {
    mainClassName = "xyz.sashenka.modelauthapp.Main"
    applicationName = "app"
}

apply {
    application
}

val staging: Configuration by configurations.creating

dependencies {
    // heroku app runner
    staging("com.heroku:webapp-runner-main:9.0.31.0")
    providedCompile("javax.servlet:javax.servlet-api:3.1.0")
}

tasks {
    val copyToLib by registering(Copy::class) {
        into("$buildDir/server")
        from(staging) {
            include("webapp-runner*")
        }
    }

    register("stage") {
        dependsOn(war, copyToLib)
    }
}