FROM node

USER root

WORKDIR /app

COPY . ./

RUN npm i

RUN chmod +x entrypoint.sh

ENTRYPOINT [ "sh", "./entrypoint.sh" ]
