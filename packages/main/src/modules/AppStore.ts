import Store from 'electron-store';

// Initialize settings store
const store = new Store({
    schema: {
        window: {
            type: 'object',
            properties: {
                bounds: {
                    type: 'object',
                    properties: {
                        x: { type: 'number' },
                        y: { type: 'number' },
                        width: { type: 'number' },
                        height: { type: 'number' }
                    }
                }
            }
        },
        apiKeys: {
            type: 'object',
            properties: {
                anthropic: { type: 'string' }
            }
        },
        models: {
            type: 'object',
            properties: {
                preferred: { type: 'string', default: 'anthropic' },
                localModels: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            path: { type: 'string' },
                            active: { type: 'boolean' }
                        }
                    },
                    default: []
                }
            }
        },
        mcp: {
            type: 'object',
            properties: {
                applications: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            version: { type: 'string' },
                            enabled: { type: 'boolean' }
                        }
                    },
                    default: []
                }
            }
        },
        servers: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    port: { type: 'number' },
                    modelId: { type: 'string' },
                    autoStart: { type: 'boolean' }
                }
            },
            default: []
        }
    }
});

export default store;