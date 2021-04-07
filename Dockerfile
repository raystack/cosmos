FROM node:12.13-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12.13-alpine AS server
ENV NODE_ENV production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --chown=node:node --from=builder ./app/build ./build
USER node
CMD ["npm", "start"]
