FROM cubejs/cube:v0.27.3-alpine
COPY package* ./
RUN npm ci --only=production
COPY . .
