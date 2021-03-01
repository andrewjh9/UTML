
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
