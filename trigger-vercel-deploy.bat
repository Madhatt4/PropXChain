@echo off
echo ===================================================
echo PropXChain Vercel Deployment Trigger
echo ===================================================
echo.
echo This script will trigger a Vercel deployment for your PropXChain website.
echo.
echo Triggering Vercel deployment...
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_AEV5Y5NFY08VHEXenv3a4cYxLSRP/2KYDgd11hD
echo.
echo Vercel deployment triggered.
echo.
echo You can check the status of your deployment at:
echo https://vercel.com/dashboard
echo.
echo Press any key to exit...
pause > nul
