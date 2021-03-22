FROM node:12.13-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12.13-alpine AS server
ENV NODE_ENV production
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --chown=node:node --from=builder ./app/build ./build
COPY --chown=node:node --from=builder ./app/package.json .
USER node
CMD ["npm", "start"]
