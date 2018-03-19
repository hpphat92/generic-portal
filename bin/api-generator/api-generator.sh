# Generate API services and models
rm --recursive -f ./src/app/shared/api
java -jar ./bin/api-generator/swagger-codegen-cli.jar generate -i http://genericportalbackend.azurewebsites.net:80/swagger/docs/v1 -l typescript-angular -o ./src/app/shared/api
