FROM node:19-alpine as builder
WORKDIR /app
COPY package.json .
RUN apk add bash
RUN npm install

FROM node:19-alpine as start
WORKDIR /usr/src/app
RUN apk update && apk add bash

COPY package.json .
COPY ./.env ./.env
COPY index.js ./index.js
COPY ./src ./src
COPY --from=builder /app/node_modules ./node_modules
COPY wait-for-it.sh /script/wait-for-it.sh

EXPOSE 3000