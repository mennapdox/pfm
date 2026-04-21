import { Tool } from '@modelcontextprotocol/sdk/types.js';
export declare const toolHandlers: {
    getToolDefinitions(): Tool[];
    handleToolCall(name: string, args: any): Promise<{
        content: {
            type: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        content: {
            type: string;
            text: string;
        }[];
        isError: boolean;
    }>;
};
//# sourceMappingURL=tools.d.ts.map