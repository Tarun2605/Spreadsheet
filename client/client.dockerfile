# Base image for Node.js
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Serve the React app with a static server
# Optionally, you can use `serve` or another static file server.
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose the necessary port
EXPOSE 3000
