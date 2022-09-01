FROM node:14-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM alpine:3.13 as server
ADD ./etc/nginx-boot.sh /sbin/nginx-boot
RUN chmod +x /sbin/nginx-boot && \
  apk --update add nginx bash
COPY --from=builder ./app/build /public
CMD [ "/sbin/nginx-boot" ]
