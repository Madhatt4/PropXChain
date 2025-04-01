@echo off
echo Copying backend files from backend branch to main branch...

REM First, make sure we're in the repository root
cd %~dp0

REM Create a propxchain-backend directory in the main branch if it doesn't exist
mkdir propxchain-backend 2>nul

REM Checkout the backend branch to get the files
git checkout backend -- .

REM Copy the backend files to the propxchain-backend directory
copy render-server.js propxchain-backend\server.js
copy render-package.json propxchain-backend\package.json
copy render-README.md propxchain-backend\README.md
copy render-gitignore propxchain-backend\.gitignore
copy render-deployment-guide.md propxchain-backend\deployment-guide.md

REM Checkout the main branch again
git checkout main

REM Add the propxchain-backend directory to git
git add propxchain-backend

REM Commit the changes
git commit -m "Add backend files from backend branch"

REM Push the changes to the remote repository
git push origin main

echo.
echo If successful, the backend files have been copied to the propxchain-backend directory in the main branch.
echo You can now deploy the main branch to Render.
echo.
pause
