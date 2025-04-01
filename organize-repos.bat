@echo off
echo Organizing repository structure...

REM Check if we're in the propxchain directory
if not exist ".git" (
    echo Error: This script must be run from the propxchain directory.
    echo Please navigate to the propxchain directory and try again.
    goto :end
)

REM Create a clean backend directory if it doesn't exist
if not exist "backend" (
    mkdir backend
    echo Created backend directory.
)

REM Copy files from propxchain-backend to backend
echo Copying files from propxchain-backend to backend...
copy propxchain-backend\server.js backend\server.js
copy propxchain-backend\package.json backend\package.json
if exist "propxchain-backend\README.md" copy propxchain-backend\README.md backend\README.md
if exist "propxchain-backend\.gitignore" copy propxchain-backend\.gitignore backend\.gitignore
if exist "propxchain-backend\.env-sample" copy propxchain-backend\.env-sample backend\.env-sample

REM Add the backend directory to git
echo Adding backend directory to git...
git add backend

REM Commit the changes
echo Committing changes...
git commit -m "Organize repository structure and add backend files"

REM Push the changes to GitHub
echo Pushing changes to GitHub...
git push origin main

echo.
echo Repository structure has been organized.
echo The backend files have been copied to the backend directory and pushed to GitHub.
echo.
echo Next steps:
echo 1. Deploy the backend to Render
echo 2. Set up the environment variables in Render
echo 3. Test the contact form
echo.
pause

:end
