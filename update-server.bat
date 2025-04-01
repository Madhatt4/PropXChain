@echo off
echo Updating server.js with fixed version...

REM Copy the fixed server.js to the backend directory
copy backend\server-fixed.js backend\server.js

REM Add the changes to git
git add backend\server.js

REM Commit the changes
git commit -m "Fix server.js syntax errors and improve error handling"

REM Push the changes to GitHub
git push origin main

echo.
echo Server.js has been updated with the fixed version.
echo You can now redeploy your backend on Render.
echo.
pause
