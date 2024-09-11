# Parent Image
FROM node:20.17.0

# Install nodemon and typescript globally [ For development ]
RUN npm i -g nodemon typescript

# Establish the working directory
WORKDIR /app

# Copy the package.json file
COPY package.json .

# build the application
RUN npm install

# Copy the app files
COPY . .

# Expose the port
EXPOSE 4000

# Initialize the app and run the server
CMD [ "npm", "run", "dev" ]