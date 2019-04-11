FROM nginx:latest

COPY . /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /app

EXPOSE 9000

CMD ["sh", "-c", "./initialize_container.sh && nginx -g 'daemon off;'"]
