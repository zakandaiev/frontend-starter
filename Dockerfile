FROM node:lts-alpine AS build

WORKDIR /app

COPY . .

RUN apk update && apk add --no-cache bash curl mc netcat-openbsd && npm install --ignore-scripts && npm run build && rm -rf /etc/apk/cache

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
