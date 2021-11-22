FROM node

ENTRYPOINT ["tail", "-f", "/dev/null"]

USER root

WORKDIR /app

COPY . ./

RUN npm i

# CMD npm test