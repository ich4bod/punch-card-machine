FROM nginx:1.27-alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/punch-card-machine.conf
COPY site/ /usr/share/nginx/html/
EXPOSE 3000
