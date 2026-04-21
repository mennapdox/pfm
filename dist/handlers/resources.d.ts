import { Resource } from '@modelcontextprotocol/sdk/types.js';
export declare const resourceHandlers: {
    getResourceDefinitions(): Resource[];
    handleResourceRead(uri: string): Promise<{
        contents: {
            uri: "mcp://project/info";
            mimeType: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        contents: {
            uri: "mcp://project/status";
            mimeType: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        contents: {
            uri: "mcp://server/config";
            mimeType: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        contents: {
            uri: string;
            mimeType: string;
            text: string;
        }[];
        isError: boolean;
    }>;
};
//# sourceMappingURL=resources.d.ts.map