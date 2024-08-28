# Base image for Node.js
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment to production
ENV NODE_ENV production

# Start the Express server
CMD ["node", "index.js"]

# Expose the necessary port
EXPOSE 5000
