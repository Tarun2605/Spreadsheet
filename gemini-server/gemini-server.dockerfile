# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 1965

# Define the command to run the application
CMD ["node", "server/server.js"]
