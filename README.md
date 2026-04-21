# MCP Project Structure

This is a comprehensive project structure for building MCP (Model Context Protocol) servers and applications.

## Project Structure

```
mcp-project/
  src/
    index.ts              # Main entry point
    server/               # MCP server implementations
      mcp-server.ts       # Core MCP server
      handlers/           # Request handlers
        tools.ts          # Tool handlers
        resources.ts      # Resource handlers
        prompts.ts        # Prompt handlers
    types/                # TypeScript type definitions
      index.ts            # Exported types
    utils/                # Utility functions
      index.ts            # Helper functions
  tests/                  # Test files
    server.test.ts
    handlers.test.ts
  docs/                   # Documentation
    api.md                # API documentation
    examples.md           # Usage examples
  config/                 # Configuration files
    mcp-config.json       # MCP server configuration
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## MCP Server Features

- **Tools**: Custom tools for AI assistants
- **Resources**: Static and dynamic resources
- **Prompts**: Pre-defined prompts for common tasks
- **Handlers**: Request processing logic
- **Type Safety**: Full TypeScript support

## Configuration

The MCP server can be configured through `config/mcp-config.json`.

## Testing

Run tests with:
```bash
npm test
```

## License

MIT
