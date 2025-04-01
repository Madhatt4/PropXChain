@echo off
echo Installing Git MCP Server...

REM Create directory for the Git MCP server
mkdir %APPDATA%\Claude\mcp-servers\git-mcp-server

REM Copy files to the directory
copy git-mcp-server.js %APPDATA%\Claude\mcp-servers\git-mcp-server\
copy git-mcp-package.json %APPDATA%\Claude\mcp-servers\git-mcp-server\package.json
copy git-mcp-readme.md %APPDATA%\Claude\mcp-servers\git-mcp-server\README.md

REM Install dependencies
cd %APPDATA%\Claude\mcp-servers\git-mcp-server
npm install

REM Update MCP settings file
echo Updating MCP settings file...
set SETTINGS_FILE=%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json

REM Check if the settings file exists
if not exist "%SETTINGS_FILE%" (
    echo Creating new MCP settings file...
    echo { "mcpServers": {} } > "%SETTINGS_FILE%"
)

REM Add the Git MCP server to the settings file
powershell -Command "$settings = Get-Content '%SETTINGS_FILE%' | ConvertFrom-Json; $settings.mcpServers.git = @{ command = 'node'; args = @('%APPDATA%\Claude\mcp-servers\git-mcp-server\git-mcp-server.js'); disabled = $false; autoApprove = @() }; $settings | ConvertTo-Json -Depth 10 | Set-Content '%SETTINGS_FILE%'"

echo.
echo Git MCP Server installed successfully!
echo.
echo You can now use the Git MCP server with Claude to perform Git operations.
echo See git-mcp-readme.md for usage instructions.
echo.
pause
