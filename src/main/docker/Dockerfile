FROM openjdk:13-alpine
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} application.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "application.jar"]