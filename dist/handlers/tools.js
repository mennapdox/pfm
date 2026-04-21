export const toolHandlers = {
    getToolDefinitions() {
        return [
            {
                name: 'echo',
                description: 'Echo back the input text',
                inputSchema: {
                    type: 'object',
                    properties: {
                        text: {
                            type: 'string',
                            description: 'Text to echo back',
                        },
                    },
                    required: ['text'],
                },
            },
            {
                name: 'get_current_time',
                description: 'Get the current time',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
            {
                name: 'calculate',
                description: 'Perform basic mathematical calculations',
                inputSchema: {
                    type: 'object',
                    properties: {
                        expression: {
                            type: 'string',
                            description: 'Mathematical expression to evaluate',
                        },
                    },
                    required: ['expression'],
                },
            },
        ];
    },
    async handleToolCall(name, args) {
        switch (name) {
            case 'echo':
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Echo: ${args.text}`,
                        },
                    ],
                };
            case 'get_current_time':
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Current time: ${new Date().toISOString()}`,
                        },
                    ],
                };
            case 'calculate':
                try {
                    // Simple calculator - be careful with eval in production
                    const result = Function('"use strict"; return (' + args.expression + ')')();
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `${args.expression} = ${result}`,
                            },
                        ],
                    };
                }
                catch (error) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Error calculating ${args.expression}: ${error}`,
                            },
                        ],
                        isError: true,
                    };
                }
            default:
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Unknown tool: ${name}`,
                        },
                    ],
                    isError: true,
                };
        }
    },
};
//# sourceMappingURL=tools.js.map