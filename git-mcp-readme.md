# Git MCP Server

This is a Model Context Protocol (MCP) server for Git operations. It provides tools for pushing, merging, checking out branches, adding files, and committing changes to Git repositories.

## Installation

1. Make sure you have Node.js installed (version 14 or higher).

2. Install the MCP SDK:
   ```
   npm install @modelcontextprotocol/sdk
   ```

3. Install the Git MCP server:
   ```
   npm install
   ```

## Configuration

To use the Git MCP server with Claude, you need to add it to your MCP settings file:

1. Open the MCP settings file:
   - Windows: `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
   - macOS: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

2. Add the Git MCP server to the `mcpServers` object:
   ```json
   {
     "mcpServers": {
       "git": {
         "command": "node",
         "args": ["C:/Users/Admin/Desktop/Propxchain/git-mcp-server.js"],
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

## Usage

Once the Git MCP server is configured, you can use it with Claude to perform Git operations:

### Push Changes

```
<use_mcp_tool>
<server_name>git</server_name>
<tool_name>git_push</tool_name>
<arguments>
{
  "repo_path": "C:/Users/Admin/Desktop/Propxchain",
  "branch": "main"
}
</arguments>
</use_mcp_tool>
```

### Merge Branches

```
<use_mcp_tool>
<server_name>git</server_name>
<tool_name>git_merge</tool_name>
<arguments>
{
  "repo_path": "C:/Users/Admin/Desktop/Propxchain",
  "source_branch": "backend",
  "target_branch": "main",
  "allow_unrelated_histories": true
}
</arguments>
</use_mcp_tool>
```

### Checkout Branch

```
<use_mcp_tool>
<server_name>git</server_name>
<tool_name>git_checkout</tool_name>
<arguments>
{
  "repo_path": "C:/Users/Admin/Desktop/Propxchain",
  "branch": "main"
}
</arguments>
</use_mcp_tool>
```

### Add Files

```
<use_mcp_tool>
<server_name>git</server_name>
<tool_name>git_add</tool_name>
<arguments>
{
  "repo_path": "C:/Users/Admin/Desktop/Propxchain",
  "files": ["file1.js", "file2.js"]
}
</arguments>
</use_mcp_tool>
```

### Commit Changes

```
<use_mcp_tool>
<server_name>git</server_name>
<tool_name>git_commit</tool_name>
<arguments>
{
  "repo_path": "C:/Users/Admin/Desktop/Propxchain",
  "message": "Add new feature"
}
</arguments>
</use_mcp_tool>
```

## Troubleshooting

If you encounter any issues:

1. Make sure the Git MCP server is properly configured in your MCP settings file.
2. Check that the path to the Git MCP server is correct.
3. Ensure that you have the necessary permissions to access the Git repository.
4. Check the Claude console for any error messages.
