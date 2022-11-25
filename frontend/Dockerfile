FROM node:19-alpine as installer

WORKDIR /app
RUN npm install -g @angular/cli
COPY package.json .
RUN npm install

FROM node:19-alpine as start
ENV NODE_OPTIONS=--max_old_space_size=2048

WORKDIR /usr/src/app

RUN apk add bash
RUN apk update && apk add bash

COPY src ./src
COPY ["package.json", "angular.json", "tsconfig.app.json", "tsconfig.json", "tsconfig.spec.json", "./"]
COPY --from=installer /app/node_modules ./node_modules

EXPOSE 4200 49153
