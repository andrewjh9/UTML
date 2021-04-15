#Running and Developing the Backend
## Build angular and serve from backend
Use the following commands build and to copy the angular into the backend:\
`cd client `\
`sudo npm run ng -p build `\
`cd .. `\
`cp -r client/dist/client/. src/main/resources/static`
### Settings
The `application.properties` need to be set before you can run the backend. This includes the Oauth2 and database credentials.
These are set mainly by environment variables these can be set manually or via an IDE plugin 

### Development
Your IDE should pick up the project and allow you to run it.
Otherwise, you can build the jar as described below and run in via the java command line.
### Deployment 
Build the project jar using: `mvn package -Dmaven.test.skip=true` \
Upload the jar to your server along with the `docker-compose.yml` file. \
The production environment variables as set in the `application.properties` file can be set via a .env file. \
The .env file should be placed next to the `docker-compose` file and the jar. \
The exact .env file name can be set within the `docker-compose` file. \
If you plan to use the compose file's nginx server for the reverse proxy you will also need to upload the folder nginx to your server. \
Which contains the nginx config file. \
Once this is all in place you can run `docker-compose up --build -d` to build the docker images.

