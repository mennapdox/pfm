#!/usr/bin/env node
import { MCPServer } from './server/mcp-server.js';
async function main() {
    try {
        const server = new MCPServer();
        await server.start();
        console.log('MCP Server started successfully');
    }
    catch (error) {
        console.error('Failed to start MCP Server:', error);
        process.exit(1);
    }
}
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
//# sourceMappingURL=index.js.map