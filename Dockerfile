FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source files
COPY index.js ./
COPY data/ ./data/

# Set environment
ENV NODE_ENV=production

# Run the MCP server
CMD ["node", "index.js"]
