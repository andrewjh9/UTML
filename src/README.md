

##Serve angular
Use the following commands build and to copy the angular into the backend:
cd client &&
sudo npm run ng -p build && cd .. &&
cp -r client/dist/client/. src/main/resources/static`

##Serving Local Host remotely 
For dev and testing lspurposes you may wish to point your local host at a remote URL. 
In order to this with the project run the App (including back-end) via intelij and run the follow command: 
`lt --port 8080` with 8080 corresponding to the port you are running your instance of the  app on. 

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
docker-compose build && docker-compose --env-file ./dev.env up \
containered application will be available at localhost:9000


### Serve frontend 
Copy angular into spring boot


### Generating a key for saml
keytool -genkey -alias utmlsaml -keyalg RSA -sigalg SHA256withRSA -keysize 2048 -validity 3650 -keystore saml-keystore.jks


##Adding Secret vars to Heroku 
heroku config:set DB_PASSWORD=secret -a [heroku-app-name]
