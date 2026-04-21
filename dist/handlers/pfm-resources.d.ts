import { Resource } from '@modelcontextprotocol/sdk/types.js';
export declare const pfmResourceHandlers: {
    getResourceDefinitions(): Resource[];
    handleResourceRead(uri: string): Promise<{
        contents: {
            uri: "pfm://server/config";
            mimeType: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        contents: {
            uri: "pfm://server/status";
            mimeType: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        contents: {
            uri: "pfm://projects/summary";
            mimeType: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        contents: {
            uri: "pfm://users/summary";
            mimeType: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        contents: {
            uri: "pfm://vendors/summary";
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
//# sourceMappingURL=pfm-resources.d.ts.map
