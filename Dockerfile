FROM node:latest

COPY . /app
WORKDIR /app

EXPOSE 9000

RUN npm install --loglevel=silent --no-summary
RUN npm run build-prod

CMD ["node", "server.js"]
