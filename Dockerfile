FROM node:lts-alpine3.18

WORKDIR /app

ARG APP_MODE
ENV APP_MODE=$APP_MODE

COPY . /app

RUN apk update && apk add --no-cache bash curl mc netcat-openbsd && npm install --ignore-scripts && npm run build

CMD ["npm", "run", "preview"]
