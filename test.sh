#!/bin/bash

docker pull siggame/colisee-db
docker rm --force visapi-db
docker run --name visapi-db --publish 5432:5432 --detach siggame/colisee-db

npm run test

docker stop visapi-db