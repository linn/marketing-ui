FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
ENV GIT_BRANCH $gitBranch
ENV PUBLIC_URL $publicUrl
EXPOSE 5050
CMD [ "node", "server.js" ]