# Use Node.js official image as base
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app 

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Copy the rest of the app files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
