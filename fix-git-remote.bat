@echo off
echo Fixing Git remote URL for PropXchain backend...

cd propxchain-backend

REM Remove existing remote
git remote remove origin

REM Add correct remote
git remote add origin https://github.com/Madhatt4/PropXChain.git

REM Verify remote
git remote -v

REM Create a new branch for the backend
git checkout -b backend

REM Push to the new branch
git push -u origin backend

echo.
echo If successful, you should see the backend branch in your GitHub repository.
echo.
pause
