@echo off
echo Starting repository cleanup...

echo 1. Creating backup directory...
mkdir backup
mkdir backup\propxchain-backend
mkdir backup\backend

echo 2. Backing up files...
xcopy /E /I /Y propxchain-backend backup\propxchain-backend
xcopy /E /I /Y backend backup\backend

echo 3. Ensuring backend directory has all necessary files...
copy /Y backend\server-fixed.js backend\server.js
if not exist backend\.env (
    copy /Y propxchain-backend\.env backend\.env
)

echo 4. Removing duplicate backend files from propxchain-backend...
del propxchain-backend\server.js
del propxchain-backend\render-server.js
del propxchain-backend\package.json
del propxchain-backend\package-lock.json
del propxchain-backend\package-json.json
del propxchain-backend\render-package.json
del propxchain-backend\.env-sample
del propxchain-backend\render-gitignore
del propxchain-backend\render-README.md
del propxchain-backend\render-deployment-guide.md
del propxchain-backend\deployment-guide.md
del propxchain-backend\backend-readme.txt
del "propxchain-backend\backend-readme (1).txt"
del propxchain-backend\vercel.json

echo 5. Removing unnecessary files...
del fix-json-files.bat
del vercel-fixed.json
del propxchain-backend\vercel.json.fixed
del propxchain-backend\package.json.fixed
rmdir /S /Q propxchain-backend-fixed

echo 6. Removing nested propxchain-backend directory...
rmdir /S /Q propxchain-backend\propxchain-backend

echo Repository cleanup completed!
echo Please review the changes and then commit them.
