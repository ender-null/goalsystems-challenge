FROM node:alpine AS builder

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest AS release

LABEL org.opencontainers.image.source https://github.com/ender-null/goalsystems-challenge

COPY --from=builder /usr/src/app/build /usr/share/nginx/html