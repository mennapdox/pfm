import axios from 'axios';
const PFM_BASE_URL = 'https://pfm-staging.procuredox.ca';
const PFM_USERNAME = 'ahmeda@procuredox.com';
const PFM_PASSWORD = 'Allam@1234';
const pfmConfig = {
    baseURL: PFM_BASE_URL,
    credentials: {
        username: PFM_USERNAME,
        password: PFM_PASSWORD,
    },
};
class PFMClient {
    authToken = null;
    async authenticate() {
        try {
            const response = await axios.post(`${pfmConfig.baseURL}/api/auth/login`, {
                username: pfmConfig.credentials.username,
                password: pfmConfig.credentials.password,
            });
            if (response.data.token) {
                this.authToken = response.data.token;
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Authentication failed:', error);
            return false;
        }
    }
    async makeRequest(endpoint, method = 'GET', data) {
        if (!this.authToken) {
            await this.authenticate();
        }
        try {
            const response = await axios({
                method,
                url: `${pfmConfig.baseURL}${endpoint}`,
                headers: {
                    'Authorization': `Bearer ${this.authToken}`,
                    'Content-Type': 'application/json',
                },
                data,
            });
            return response.data;
        }
        catch (error) {
            console.error(`Request to ${endpoint} failed:`, error);
            throw error;
        }
    }
    async getProjects() {
        return this.makeRequest('/api/projects');
    }
    async getProjectById(projectId) {
        return this.makeRequest(`/api/projects/${projectId}`);
    }
    async getDocuments(projectId) {
        const endpoint = projectId ? `/api/documents?projectId=${projectId}` : '/api/documents';
        return this.makeRequest(endpoint);
    }
    async getUsers() {
        return this.makeRequest('/api/users');
    }
    async getVendors() {
        return this.makeRequest('/api/vendors');
    }
    async getPurchaseOrders() {
        return this.makeRequest('/api/purchase-orders');
    }
    async getInvoices() {
        return this.makeRequest('/api/invoices');
    }
}
export const pfmClient = new PFMClient();
export const pfmToolHandlers = {
    getToolDefinitions() {
        return [
            {
                name: 'pfm_get_projects',
                description: 'Get all projects from PFM staging server',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
            {
                name: 'pfm_get_project',
                description: 'Get a specific project by ID from PFM staging server',
                inputSchema: {
                    type: 'object',
                    properties: {
                        projectId: {
                            type: 'string',
                            description: 'Project ID to retrieve',
                        },
                    },
                    required: ['projectId'],
                },
            },
            {
                name: 'pfm_get_documents',
                description: 'Get documents from PFM staging server',
                inputSchema: {
                    type: 'object',
                    properties: {
                        projectId: {
                            type: 'string',
                            description: 'Optional project ID to filter documents',
                        },
                    },
                },
            },
            {
                name: 'pfm_get_users',
                description: 'Get all users from PFM staging server',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
            {
                name: 'pfm_get_vendors',
                description: 'Get all vendors from PFM staging server',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
            {
                name: 'pfm_get_purchase_orders',
                description: 'Get all purchase orders from PFM staging server',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
            {
                name: 'pfm_get_invoices',
                description: 'Get all invoices from PFM staging server',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
            {
                name: 'pfm_server_status',
                description: 'Check PFM staging server connection status',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
        ];
    },
    async handleToolCall(name, args) {
        try {
            switch (name) {
                case 'pfm_get_projects':
                    const projects = await pfmClient.getProjects();
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Projects from PFM staging server:\n\n${JSON.stringify(projects, null, 2)}`,
                            },
                        ],
                    };
                case 'pfm_get_project':
                    const project = await pfmClient.getProjectById(args.projectId);
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Project ${args.projectId}:\n\n${JSON.stringify(project, null, 2)}`,
                            },
                        ],
                    };
                case 'pfm_get_documents':
                    const documents = await pfmClient.getDocuments(args.projectId);
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Documents from PFM staging server:\n\n${JSON.stringify(documents, null, 2)}`,
                            },
                        ],
                    };
                case 'pfm_get_users':
                    const users = await pfmClient.getUsers();
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Users from PFM staging server:\n\n${JSON.stringify(users, null, 2)}`,
                            },
                        ],
                    };
                case 'pfm_get_vendors':
                    const vendors = await pfmClient.getVendors();
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Vendors from PFM staging server:\n\n${JSON.stringify(vendors, null, 2)}`,
                            },
                        ],
                    };
                case 'pfm_get_purchase_orders':
                    const purchaseOrders = await pfmClient.getPurchaseOrders();
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Purchase Orders from PFM staging server:\n\n${JSON.stringify(purchaseOrders, null, 2)}`,
                            },
                        ],
                    };
                case 'pfm_get_invoices':
                    const invoices = await pfmClient.getInvoices();
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Invoices from PFM staging server:\n\n${JSON.stringify(invoices, null, 2)}`,
                            },
                        ],
                    };
                case 'pfm_server_status':
                    const isAuthenticated = await pfmClient.authenticate();
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `PFM Staging Server Status:\n\nServer: ${pfmConfig.baseURL}\nAuthenticated: ${isAuthenticated}\nTimestamp: ${new Date().toISOString()}`,
                            },
                        ],
                    };
                default:
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Unknown PFM tool: ${name}`,
                            },
                        ],
                        isError: true,
                    };
            }
        }
        catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error executing PFM tool ${name}: ${error}`,
                    },
                ],
                isError: true,
            };
        }
    },
};
//# sourceMappingURL=pfm-tools.js.map