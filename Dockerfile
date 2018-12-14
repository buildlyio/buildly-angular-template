FROM node:latest

COPY . /app
WORKDIR /app

EXPOSE 9000

CMD ["node", "server.js"]

CMD ["cat", "src/environments/environment.prod.ts"]

RUN npm install --loglevel=silent --no-summary
RUN npm rebuild node-sass
RUN npm run build-prod

