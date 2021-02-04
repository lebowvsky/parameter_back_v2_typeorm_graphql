FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm i
COPY ./dist ./dist
CMD node dist/index.js
