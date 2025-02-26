# Use a compatible Node.js version
FROM node:20 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Vite development server port
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
