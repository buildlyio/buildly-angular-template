FROM nginx:latest

COPY . /app
WORKDIR /app

EXPOSE 80

CMD ["./initialize_container.sh"]
CMD ["sh", "-c", "nginx -g 'daemon off;'"]
