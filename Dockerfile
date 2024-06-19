# Use an official Node runtime as a parent image
FROM node:18.1.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the client directory
COPY client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the client directory
COPY client/ .

# Exposing the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]