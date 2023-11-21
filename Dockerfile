FROM node:alpine as base

ENV TZ=Asia/Jakarta

WORKDIR /

COPY /bin /bin

COPY /node_modules /node_modules

COPY /src/swagger/swagger.yaml /src/swagger/swagger.yaml

EXPOSE 8000

CMD ["node", "./bin/server.js"]