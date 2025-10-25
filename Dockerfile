FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src ./src
COPY .env ./.env

ENV PORT=8080
EXPOSE 8080
CMD ["node", "src/server.js"]
