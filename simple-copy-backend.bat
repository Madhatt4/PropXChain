@echo off
echo Copying backend files to main branch...

REM Create a backend directory in the main branch if it doesn't exist
mkdir backend 2>nul

REM Copy the backend files to the backend directory
copy propxchain-backend\server.js backend\server.js
copy propxchain-backend\package.json backend\package.json
copy propxchain-backend\README.md backend\README.md
copy propxchain-backend\.gitignore backend\.gitignore
copy propxchain-backend\.env-sample backend\.env-sample

REM Add the backend directory to git
git add backend

REM Commit the changes
git commit -m "Add backend files for contact form"

REM Push the changes to the remote repository
git push origin main

echo.
echo If successful, the backend files have been copied to the backend directory in the main branch.
echo You can now deploy the main branch to Render.
echo.
pause
