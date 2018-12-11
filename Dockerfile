FROM node:latest

COPY . /app
WORKDIR /app

EXPOSE 9000

RUN npx ng serve --prod
