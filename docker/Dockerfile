# Base image for Node.js
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json files from both client and server
COPY client/package.json client/
COPY server/package.json server/

# Install dependencies for both client and server
RUN cd client && npm install
RUN cd server && npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN cd client && npm run build

# Serve the React app with the Express server
WORKDIR /app/server
ENV NODE_ENV production
CMD ["node", "index.js"]

# Expose the necessary port
EXPOSE 3000
