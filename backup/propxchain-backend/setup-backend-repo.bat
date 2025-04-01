@echo off
echo Setting up PropXchain Backend Repository...

REM Create the backend directory
mkdir propxchain-backend
echo Created directory: propxchain-backend

REM Copy files with proper names
echo Copying files...
copy render-server.js propxchain-backend\server.js
copy render-package.json propxchain-backend\package.json
copy render-README.md propxchain-backend\README.md
copy render-gitignore propxchain-backend\.gitignore
copy render-deployment-guide.md propxchain-backend\deployment-guide.md

REM Create .env-sample file
echo Creating .env-sample file...
echo # MongoDB connection string > propxchain-backend\.env-sample
echo MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database >> propxchain-backend\.env-sample
echo # Email configuration >> propxchain-backend\.env-sample
echo EMAIL_SERVICE=outlook >> propxchain-backend\.env-sample
echo EMAIL_USER=your-email@example.com >> propxchain-backend\.env-sample
echo EMAIL_PASSWORD=your-password >> propxchain-backend\.env-sample
echo # Environment >> propxchain-backend\.env-sample
echo NODE_ENV=production >> propxchain-backend\.env-sample

REM Initialize Git repository
echo Initializing Git repository...
cd propxchain-backend
git init
git add .
git commit -m "Initial commit for PropXchain backend"

echo.
echo Repository setup complete!
echo.
echo Next steps:
echo 1. Create a new repository on GitHub
echo 2. Run the following commands:
echo    git remote add origin https://github.com/YOUR-ACTUAL-USERNAME/propxchain-backend.git
echo    git push -u origin master
echo.
echo IMPORTANT: Replace YOUR-ACTUAL-USERNAME with your actual GitHub username
echo If you get an error, check git-push-fix.md for troubleshooting steps
echo.
pause
