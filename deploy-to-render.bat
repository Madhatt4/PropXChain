@echo off
echo ===================================================
echo PropXChain Render Deployment Helper
echo ===================================================
echo.
echo This script will help you deploy your PropXChain website to Render
echo with MongoDB integration for the contact form.
echo.
echo Prerequisites:
echo 1. A Render account (https://render.com)
echo 2. A MongoDB Atlas account with a cluster set up
echo 3. Git installed and configured
echo.
echo Steps:
echo 1. Commit and push your changes to GitHub
echo 2. Create a new Web Service on Render
echo 3. Configure the environment variables
echo 4. Deploy the application
echo.
echo For detailed instructions, please refer to RENDER_SETUP.md
echo.
echo ===================================================
echo.

echo Would you like to commit and push your changes to GitHub now? (Y/N)
set /p choice=

if /i "%choice%"=="Y" (
    echo.
    echo Committing changes to GitHub...
    git add .
    git commit -m "Add MongoDB integration for contact form"
    git push
    echo.
    echo Changes pushed to GitHub.
    echo.
    echo Triggering Vercel deployment...
    curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_AEV5Y5NFY08VHEXenv3a4cYxLSRP/2KYDgd11hD
    echo.
    echo Vercel deployment triggered.
    echo.
) else (
    echo.
    echo Skipping Git operations.
    echo.
)

echo ===================================================
echo.
echo Next steps:
echo 1. Go to https://dashboard.render.com/
echo 2. Create a new Web Service
echo 3. Connect your GitHub repository
echo 4. Configure the following settings:
echo    - Name: PropXChain
echo    - Environment: Node
echo    - Build Command: npm install
echo    - Start Command: node render.js
echo    - Root Directory: (leave empty)
echo 5. Add the following environment variables:
echo    - MONGODB_URI: mongodb+srv://marchatton:Marc2711@cluster0.elgpsni.mongodb.net/PropXChain
echo    - NODE_ENV: production
echo 6. Click "Create Web Service"
echo.
echo ===================================================
echo.
echo After deployment, you can test the contact form by:
echo 1. Visit your Render URL
echo 2. Navigate to the Contact page
echo 3. Fill out and submit the form
echo 4. Check the MongoDB Atlas dashboard to verify that the submission was saved
echo.
echo For more information, please refer to RENDER_SETUP.md
echo.
echo Press any key to exit...
pause > nul
