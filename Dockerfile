FROM nginx:latest

COPY ./dist/walhall-sample-angular-app /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["./serialize_environment.sh"]
CMD ["nginx", "-g 'daemon off;'"]
