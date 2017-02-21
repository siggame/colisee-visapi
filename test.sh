#!/bin/bash

docker pull siggame/colisee-db:stable
docker rm --force visapi-db
docker run -d --name visapi-db --publish 5432:5432 siggame/colisee-db:stable

npm run test

docker stop visapi-db
