FROM nginx:1.27-alpine
ARG OCI_REVISION
ARG OCI_CREATED
LABEL org.opencontainers.image.revision=$OCI_REVISION \
      org.opencontainers.image.created=$OCI_CREATED
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/punch-card-machine.conf
COPY site/ /usr/share/nginx/html/
EXPOSE 3000
