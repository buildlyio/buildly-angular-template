FROM node:latest

COPY . /app
WORKDIR /app

EXPOSE 9000

CMD ["node", "server.js"]
