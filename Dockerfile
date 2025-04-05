FROM node:20-alpine3.20 AS build

WORKDIR /app

ARG APP_MODE
ENV APP_MODE=$APP_MODE

COPY . /app

RUN apk update && apk add --no-cache bash curl mc netcat-openbsd && npm install --ignore-scripts && npm run build && rm -rf /etc/apk/cache

# CMD ["npm", "run", "preview"]

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
