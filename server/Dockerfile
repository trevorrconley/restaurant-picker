FROM node:20-alpine
WORKDIR /app

# Copy package.json first to install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the server code
COPY . .

EXPOSE 4000
CMD ["nodemon", "server.js"]