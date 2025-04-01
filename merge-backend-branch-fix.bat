@echo off
echo Merging backend branch into main branch with --allow-unrelated-histories flag...

REM First, make sure we're in the repository root
cd %~dp0

REM Fetch the latest changes from the remote repository
git fetch origin

REM Checkout the main branch
git checkout main

REM Merge the backend branch into main with --allow-unrelated-histories flag
git merge --allow-unrelated-histories origin/backend

REM Push the changes to the remote repository
git push origin main

echo.
echo If successful, the backend branch has been merged into main.
echo You can now deploy the main branch to Render.
echo.
pause
