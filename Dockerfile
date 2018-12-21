FROM nginx:latest

COPY . /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["./serialize_environment.sh"]
