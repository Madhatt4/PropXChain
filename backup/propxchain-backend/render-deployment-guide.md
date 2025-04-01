# Deploying PropXchain Backend to Render

Based on your Render dashboard screenshot, you already have a Render account with a project. Here's how to add the PropXchain backend as a new web service:

## Step 1: Create a New Web Service

1. From your Render dashboard, click the "Add new" button in the top right corner
2. Select "Web Service" from the dropdown menu

## Step 2: Connect Your Repository or Upload Files

**Option A: If you're using GitHub:**
1. Select "Connect a repository" if you've pushed these files to GitHub
2. Find and select your repository

**Option B: If you want to upload files directly:**
1. Select "Upload files" option
2. Upload the following files:
   - `render-server.js` (rename to `server.js` when uploading)
   - `render-package.json` (rename to `package.json` when uploading)
   - `.env` file with your environment variables

## Step 3: Configure the Web Service

Fill in the following details:
- **Name**: `propxchain-backend` (or your preferred name)
- **Region**: Choose a region close to your users (Frankfurt seems to be your current region)
- **Branch**: `main` (or your default branch)
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free (or select a paid plan for production use)

## Step 4: Add Environment Variables

Click on "Advanced" and then "Add Environment Variable" to add the following:
- `MONGODB_URI`: `mongodb+srv://marchatton:Marc2711@cluster0.elgpsni.mongodb.net/propxchain`
- `EMAIL_SERVICE`: `outlook`
- `EMAIL_USER`: `marchatton@hotmail.co.uk`
- `EMAIL_PASSWORD`: `Drew1806//!`
- `NODE_ENV`: `production`

## Step 5: Deploy the Service

1. Click "Create Web Service"
2. Render will build and deploy your application
3. Wait for the deployment to complete (this may take a few minutes)

## Step 6: Note Your Service URL

Once deployed, Render will provide a URL for your service (e.g., `https://propxchain-backend.onrender.com`).

If the URL is different from what we've set in the contact form JavaScript (`https://propxchain-backend.onrender.com`), you'll need to update the URL in `js/contact-form-js.js`.

## Step 7: Test the Contact Form

1. Go to your website's contact page
2. Fill out the form and submit it
3. Check if the submission is successful
4. Verify that the data is saved to MongoDB

## Troubleshooting

If you encounter any issues:

1. Check the Render logs by clicking on your service and then the "Logs" tab
2. Verify that all environment variables are set correctly
3. Make sure the MongoDB connection string is valid
4. Check that the CORS settings in `render-server.js` include your website's domain

## Next Steps

Once your backend is successfully deployed and the contact form is working:

1. Consider setting up automatic deployments from your GitHub repository
2. Monitor the service performance in the Render dashboard
3. Set up alerts for any service disruptions
