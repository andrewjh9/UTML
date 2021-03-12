

##Serve angular
Use the following commands build and to copy the angular into the backend:
ng -p build
cp -r client/dist/client/ src/main/resources/static

##Serving Local Host remotely 
For dev and testing purposes you may wish to point your local host at a remote URL. 
In order to this with the project run the App (including back-end) via intelij and run the follow command: 
`lt --port 8080` with 8080 corresponding to the port you are running your instance of the  app on. 


##Key cloak
In order to be able to authenticate users during development you will need to access a instance of keycloak. 
An instance of keycloak can be started via docker using the following command: 
`sudo docker run -p 9000:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:12.0.4`
It is recommended to export the config file before shutting down. 

##Database
###Development
Run a postgres instance locally. Match the credentials with the ones in the development.json file. 

###Production 
A postgres docker will be started when docker is created see below. 

##Docker 
Install maven. \
Install docker\
Start docker. \
https://blog.codeleak.pl/2020/03/spring-boot-docker-compose.html

### To run 
./mvnw clean package \
Build application \
docker-compose build && docker-compose up \
containered application will be available at localhost:9000


### Serve frontend 
Copy angular into spring boot
