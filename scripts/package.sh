#!/bin/bash
set -ev

docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD
docker build --no-cache -t linn/marketing-ui:$TRAVIS_BUILD_NUMBER --build-arg gitBranch=$GIT_BRANCH .
docker push linn/marketing-ui:$TRAVIS_BUILD_NUMBER
