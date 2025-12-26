FROM node:20-alpine

WORKDIR /app

# Install MCP proxy for inspection/hosting platforms (e.g. Glama)
RUN npm install -g mcp-proxy@5.12.0

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy source files
COPY index.js ./
COPY data/ ./data/
COPY server.json ./

# Set environment
ENV NODE_ENV=production

# Run the MCP server (wrapped for inspection)
CMD ["mcp-proxy", "node", "--", "index.js"]
