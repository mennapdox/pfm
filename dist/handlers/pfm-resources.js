import { pfmClient } from './pfm-tools.js';
export const pfmResourceHandlers = {
    getResourceDefinitions() {
        return [
            {
                uri: 'pfm://server/config',
                name: 'PFM Server Configuration',
                description: 'Configuration information for PFM staging server',
                mimeType: 'application/json',
            },
            {
                uri: 'pfm://server/status',
                name: 'PFM Server Status',
                description: 'Current status and connection information for PFM staging server',
                mimeType: 'application/json',
            },
            {
                uri: 'pfm://projects/summary',
                name: 'PFM Projects Summary',
                description: 'Summary of all projects from PFM staging server',
                mimeType: 'application/json',
            },
            {
                uri: 'pfm://users/summary',
                name: 'PFM Users Summary',
                description: 'Summary of all users from PFM staging server',
                mimeType: 'application/json',
            },
            {
                uri: 'pfm://vendors/summary',
                name: 'PFM Vendors Summary',
                description: 'Summary of all vendors from PFM staging server',
                mimeType: 'application/json',
            },
        ];
    },
    async handleResourceRead(uri) {
        try {
            switch (uri) {
                case 'pfm://server/config':
                    return {
                        contents: [
                            {
                                uri,
                                mimeType: 'application/json',
                                text: JSON.stringify({
                                    baseURL: 'https://pfm-staging.procuredox.ca',
                                    username: 'ahmeda@procuredox.com',
                                    environment: 'staging',
                                    lastUpdated: new Date().toISOString(),
                                }, null, 2),
                            },
                        ],
                    };
                case 'pfm://server/status':
                    const isAuthenticated = await pfmClient.authenticate();
                    return {
                        contents: [
                            {
                                uri,
                                mimeType: 'application/json',
                                text: JSON.stringify({
                                    server: 'https://pfm-staging.procuredox.ca',
                                    status: isAuthenticated ? 'connected' : 'disconnected',
                                    authenticated: isAuthenticated,
                                    timestamp: new Date().toISOString(),
                                }, null, 2),
                            },
                        ],
                    };
                case 'pfm://projects/summary':
                    try {
                        const projects = await pfmClient.getProjects();
                        const summary = {
                            totalProjects: Array.isArray(projects) ? projects.length : 0,
                            lastSync: new Date().toISOString(),
                            projects: Array.isArray(projects) ? projects.slice(0, 5) : [],
                        };
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(summary, null, 2),
                                },
                            ],
                        };
                    }
                    catch (error) {
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify({
                                        error: 'Failed to fetch projects',
                                        message: error,
                                        timestamp: new Date().toISOString(),
                                    }, null, 2),
                                },
                            ],
                            isError: true,
                        };
                    }
                case 'pfm://users/summary':
                    try {
                        const users = await pfmClient.getUsers();
                        const summary = {
                            totalUsers: Array.isArray(users) ? users.length : 0,
                            lastSync: new Date().toISOString(),
                            users: Array.isArray(users) ? users.slice(0, 5) : [],
                        };
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(summary, null, 2),
                                },
                            ],
                        };
                    }
                    catch (error) {
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify({
                                        error: 'Failed to fetch users',
                                        message: error,
                                        timestamp: new Date().toISOString(),
                                    }, null, 2),
                                },
                            ],
                            isError: true,
                        };
                    }
                case 'pfm://vendors/summary':
                    try {
                        const vendors = await pfmClient.getVendors();
                        const summary = {
                            totalVendors: Array.isArray(vendors) ? vendors.length : 0,
                            lastSync: new Date().toISOString(),
                            vendors: Array.isArray(vendors) ? vendors.slice(0, 5) : [],
                        };
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(summary, null, 2),
                                },
                            ],
                        };
                    }
                    catch (error) {
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify({
                                        error: 'Failed to fetch vendors',
                                        message: error,
                                        timestamp: new Date().toISOString(),
                                    }, null, 2),
                                },
                            ],
                            isError: true,
                        };
                    }
                default:
                    return {
                        contents: [
                            {
                                uri,
                                mimeType: 'text/plain',
                                text: `PFM Resource not found: ${uri}`,
                            },
                        ],
                        isError: true,
                    };
            }
        }
        catch (error) {
            return {
                contents: [
                    {
                        uri,
                        mimeType: 'text/plain',
                        text: `Error accessing PFM resource ${uri}: ${error}`,
                    },
                ],
                isError: true,
            };
        }
    },
};
//# sourceMappingURL=pfm-resources.js.map