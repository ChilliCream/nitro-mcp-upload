# Nitro MCP Upload

A GitHub Action that uploads MCP feature collections to the Nitro registry.

## Usage

```yaml
- uses: ChilliCream/nitro-mcp-upload@v16
  with:
    tag: <tag>
    mcp-feature-collection-id: <mcp-feature-collection-id>
    api-key: <api-key>
    # Optional
    tool-pattern:
      - ./mcp/tools/**/*.graphql
    prompt-pattern:
      - ./mcp/prompts/**/*.json
    cloud-url: <cloud-url>
    job-id: <job-id>
```

## Inputs

| Name                        | Required | Description                                                     |
| --------------------------- | -------- | --------------------------------------------------------------- |
| `tag`                       | Yes      | The tag of the MCP feature collection version                   |
| `mcp-feature-collection-id` | Yes      | The ID of the MCP Feature Collection                            |
| `api-key`                   | Yes      | API key for authentication                                      |
| `tool-pattern`              | No       | One or more file patterns to locate MCP tool definition files   |
| `prompt-pattern`            | No       | One or more file patterns to locate MCP prompt definition files |
| `cloud-url`                 | No       | The URL of the Nitro registry                                   |

At least one of `prompt-pattern` or `tool-pattern` should be provided.

If you self-host Nitro or use a dedicated hosted instance, you can specify the `cloud-url` input to point to your instance.
