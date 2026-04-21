import { Tool } from '@modelcontextprotocol/sdk/types.js';
declare class PFMClient {
    private authToken;
    authenticate(): Promise<boolean>;
    makeRequest(endpoint: string, method?: string, data?: any): Promise<any>;
    getProjects(): Promise<any>;
    getProjectById(projectId: string): Promise<any>;
    getDocuments(projectId?: string): Promise<any>;
    getUsers(): Promise<any>;
    getVendors(): Promise<any>;
    getPurchaseOrders(): Promise<any>;
    getInvoices(): Promise<any>;
}
export declare const pfmClient: PFMClient;
export declare const pfmToolHandlers: {
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
export {};
//# sourceMappingURL=pfm-tools.d.ts.map