export const resourceHandlers = {
    getResourceDefinitions() {
        return [
            {
                uri: 'mcp://project/info',
                name: 'Project Information',
                description: 'Basic information about this MCP project',
                mimeType: 'text/plain',
            },
            {
                uri: 'mcp://project/status',
                name: 'Project Status',
                description: 'Current status and statistics of the project',
                mimeType: 'application/json',
            },
            {
                uri: 'mcp://server/config',
                name: 'Server Configuration',
                description: 'Current server configuration',
                mimeType: 'application/json',
            },
        ];
    },
    async handleResourceRead(uri) {
        switch (uri) {
            case 'mcp://project/info':
                return {
                    contents: [
                        {
                            uri,
                            mimeType: 'text/plain',
                            text: `MCP Project Structure

This is a comprehensive MCP (Model Context Protocol) project structure that provides:
- Tool handlers for custom functionality
- Resource handlers for data access
- Extensible architecture for AI assistants

Created: ${new Date().toISOString()}
Version: 1.0.0`,
                        },
                    ],
                };
            case 'mcp://project/status':
                return {
                    contents: [
                        {
                            uri,
                            mimeType: 'application/json',
                            text: JSON.stringify({
                                status: 'active',
                                uptime: process.uptime(),
                                memory: process.memoryUsage(),
                                version: '1.0.0',
                                timestamp: new Date().toISOString(),
                            }, null, 2),
                        },
                    ],
                };
            case 'mcp://server/config':
                return {
                    contents: [
                        {
                            uri,
                            mimeType: 'application/json',
                            text: JSON.stringify({
                                name: 'mcp-project-server',
                                version: '1.0.0',
                                capabilities: ['tools', 'resources'],
                                tools: ['echo', 'get_current_time', 'calculate'],
                                resources: ['project/info', 'project/status', 'server/config'],
                            }, null, 2),
                        },
                    ],
                };
            default:
                return {
                    contents: [
                        {
                            uri,
                            mimeType: 'text/plain',
                            text: `Resource not found: ${uri}`,
                        },
                    ],
                    isError: true,
                };
        }
    },
};
//# sourceMappingURL=resources.js.map