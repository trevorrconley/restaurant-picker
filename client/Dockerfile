FROM node:20-alpine
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install all dependencies including devDependencies (Vite)
RUN npm install

# Copy rest of client code
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start"]
