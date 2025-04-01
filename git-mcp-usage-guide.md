# Using the Git MCP Server

The Git MCP (Model Context Protocol) server allows you to perform Git operations directly from Claude. Here's how to install and use it:

## Installation

1. First, you need to install the MCP SDK:
   ```
   npm install @modelcontextprotocol/sdk
   ```

2. Run the `install-git-mcp.bat` script to install and configure the Git MCP server:
   ```
   .\install-git-mcp.bat
   ```

   Note: If you encounter an error about the package not being found, you may need to manually install the Git MCP server:

   ```
   mkdir %APPDATA%\Claude\mcp-servers\git-mcp-server
   copy git-mcp-server.js %APPDATA%\Claude\mcp-servers\git-mcp-server\
   copy git-mcp-package.json %APPDATA%\Claude\mcp-servers\git-mcp-server\package.json
   cd %APPDATA%\Claude\mcp-servers\git-mcp-server
   npm install
   ```

3. Add the Git MCP server to your MCP settings file:
   - Open `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
   - Add the following to the `mcpServers` object:
     ```json
     "git": {
       "command": "node",
       "args": ["%APPDATA%\\Claude\\mcp-servers\\git-mcp-server\\git-mcp-server.js"],
       "disabled": false,
       "autoApprove": []
     }
     ```

## Usage

Once the Git MCP server is installed and configured, you can use it with Claude to perform Git operations:

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

For more information, see the `git-mcp-readme.md` file.
