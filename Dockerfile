# Pull in the official lightweight version of Node 12.
FROM node:12-slim AS build-env

ENV PORT 8080

# Create and change to the app directory.
WORKDIR /app

# Install production dependencies.
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]