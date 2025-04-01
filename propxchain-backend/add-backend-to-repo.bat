@echo off
echo Adding PropXchain Backend to your existing repository...

REM Create backend directory
mkdir backend
echo Created directory: backend

REM Copy files with proper names
echo Copying files...
copy render-server.js backend\server.js
copy render-package.json backend\package.json
copy render-README.md backend\README.md
copy render-gitignore backend\.gitignore
copy render-deployment-guide.md backend\deployment-guide.md
copy git-push-fix.md backend\troubleshooting.md

REM Create .env-sample file
echo Creating .env-sample file...
echo # MongoDB connection string > backend\.env-sample
echo MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database >> backend\.env-sample
echo # Email configuration >> backend\.env-sample
echo EMAIL_SERVICE=outlook >> backend\.env-sample
echo EMAIL_USER=your-email@example.com >> backend\.env-sample
echo EMAIL_PASSWORD=your-password >> backend\.env-sample
echo # Environment >> backend\.env-sample
echo NODE_ENV=production >> backend\.env-sample

echo.
echo Files copied successfully!
echo.
echo Next steps:
echo 1. Add the files to git: git add backend/
echo 2. Commit the changes: git commit -m "Add backend server for contact form"
echo 3. Push to GitHub: git push origin main
echo.
pause
