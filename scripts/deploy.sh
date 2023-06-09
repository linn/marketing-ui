set -ev

# install aws cli
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# deploy on aws
if [ "${TRAVIS_BRANCH}" = "main" ]; then
  if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    # master - deploy to production
    echo deploy to production

    # aws s3 cp s3://$S3_BUCKET_NAME/finance/production.env ./secrets.env

    STACK_NAME=marketing-ui
    APP_ROOT=http://app.linn.co.uk
    PROXY_ROOT=http://app.linn.co.uk
  	ENV_SUFFIX=
    aws cloudformation deploy --stack-name $STACK_NAME --template-file ./aws/application.yml --parameter-overrides dockerTag=$TRAVIS_BUILD_NUMBER appRoot=$APP_ROOT environmentSuffix=$ENV_SUFFIX --capabilities=CAPABILITY_IAM

  else
    # pull request based on master - deploy to sys
    echo deploy to sys

    # aws s3 cp s3://$S3_BUCKET_NAME/finance/sys.env ./secrets.env

    STACK_NAME=marketing-ui-sys
    APP_ROOT=http://app-sys.linn.co.uk
    PROXY_ROOT=http://app.linn.co.uk
    ENV_SUFFIX=-sys
    aws cloudformation deploy --stack-name $STACK_NAME --template-file ./aws/application.yml --parameter-overrides dockerTag=$TRAVIS_BUILD_NUMBER appRoot=$APP_ROOT environmentSuffix=$ENV_SUFFIX --capabilities=CAPABILITY_IAM

  fi
else
  # not main - deploy to int if required
  echo do not deploy to int
fi

# load the secret variables but hide the output from the travis log
# source ./secrets.env > /dev/null 2>&1

# deploy the service to amazon

echo "deploy complete"
