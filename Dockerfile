FROM nginx:latest

COPY . /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /app

EXPOSE 9000

CMD ["./initialize_container.sh"]
CMD ["sh", "-c", "nginx -g 'daemon off;'"]
