FROM cubejs/cube:v0.27.30-alpine
COPY package* ./
RUN npm ci --only=production
COPY . .
