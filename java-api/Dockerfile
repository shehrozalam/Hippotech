FROM maven:3.8.6-jdk-11
WORKDIR /api-front
ADD pom.xml ./pom.xml
ADD src ./src
RUN mvn package
CMD ["java", "-jar", "./target/api.jar"]