FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
ARG GIT_BRANCH
ARG PUBLIC_URL
ENV PUBLIC_URL=$PUBLIC_URL

EXPOSE 5050
CMD [ "node", "server.js" ]