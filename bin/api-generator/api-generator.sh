# Generate API services and models
rm --recursive -f ./src/app/shared/api
java -jar ./bin/api-generator/swagger-codegen-cli.jar generate -i https://genericportalbackend.azurewebsites.net:443/swagger/docs/v1 -l typescript-angular -o ./src/app/shared/api
