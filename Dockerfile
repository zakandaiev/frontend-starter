# BUILD
FROM node:lts-alpine AS build

WORKDIR /app
COPY . .

RUN --mount=type=secret,id=env_file,target=/app/.env \
    apk update && apk add --no-cache bash curl mc netcat-openbsd \
    && npm install --ignore-scripts \
    && npm run build \
    && mkdir -p /app/sourcemaps \
    && find /app/dist -name "*.map" -exec mv {} /app/sourcemaps/ + \
    && rm -rf /etc/apk/cache

# NGINX
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/sourcemaps /sourcemaps

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
