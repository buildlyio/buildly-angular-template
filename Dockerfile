FROM nginx:1.13.12

COPY dist/walhall-sample-angular-app/ /usr/share/nginx/html
