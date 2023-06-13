#!/bin/bash
set -ev

docker login -u $DOCKER_HUB_USERNAME -p $DOCKER_HUB_PASSWORD

if [ "${TRAVIS_BRANCH}" = "main" ]; then
  if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    docker build --no-cache -t linn/marketing-ui:$TRAVIS_BUILD_NUMBER --build-arg gitBranch=$GIT_BRANCH publicUrl=https://app.linn.co.uk/marketing-ui .
  else
   docker build --no-cache -t linn/marketing-ui:$TRAVIS_BUILD_NUMBER --build-arg gitBranch=$GIT_BRANCH publicUrl=https://app-sys.linn.co.uk/marketing-ui .
  fi
fi

docker push linn/marketing-ui:$TRAVIS_BUILD_NUMBER
