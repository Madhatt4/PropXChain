# Pushing PropXchain Backend to GitHub

This guide will help you push the PropXchain backend files to GitHub, which will make it easier to deploy to Render.

## Step 1: Create a New GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., `propxchain-backend`)
4. Add a description (optional): "Backend server for PropXchain contact form"
5. Choose "Public" or "Private" visibility
6. Do not initialize the repository with a README, .gitignore, or license
7. Click "Create repository"

## Step 2: Prepare Your Local Files

1. Create a new folder for the backend files:
   ```
   mkdir propxchain-backend
   ```

2. Copy the backend files to this folder:
   ```
   copy render-server.js propxchain-backend\server.js
   copy render-package.json propxchain-backend\package.json
   copy render-README.md propxchain-backend\README.md
   copy render-gitignore propxchain-backend\.gitignore
   ```

3. Create a sample .env file (without real credentials) for reference:
   ```
   cd propxchain-backend
   echo # MongoDB connection string > .env-sample
   echo MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database >> .env-sample
   echo # Email configuration >> .env-sample
   echo EMAIL_SERVICE=outlook >> .env-sample
   echo EMAIL_USER=your-email@example.com >> .env-sample
   echo EMAIL_PASSWORD=your-password >> .env-sample
   echo # Environment >> .env-sample
   echo NODE_ENV=production >> .env-sample
   ```

## Step 3: Initialize Git and Push to GitHub

1. Navigate to your backend folder:
   ```
   cd propxchain-backend
   ```

2. Initialize a new Git repository:
   ```
   git init
   ```

3. Add all files to the staging area:
   ```
   git add .
   ```

4. Commit the files:
   ```
   git commit -m "Initial commit for PropXchain backend"
   ```

5. Add the GitHub repository as a remote:
   ```
   git remote add origin https://github.com/Madhatt4/propxchain-backend.git
   ```
   (Replace `YOUR-USERNAME` with your GitHub username and `propxchain-backend` with your repository name)

6. Push the files to GitHub:
   ```
   git push -u origin master
   ```
   (Most Git installations use `master` as the default branch. If this doesn't work, try `git push -u origin main`)

## Step 4: Verify the Repository

1. Go to your GitHub repository page
2. Confirm that all files have been uploaded correctly
3. Make sure the .env file is not included (it should be in .gitignore)

## Step 5: Deploy to Render from GitHub

Now that your code is on GitHub, you can deploy to Render directly from your GitHub repository:

1. In Render, click "New" and select "Web Service"
2. Select "Connect a repository"
3. Find and select your `propxchain-backend` repository
4. Configure the service as described in the render-deployment-guide.md
5. Add your environment variables
6. Click "Create Web Service"

This approach makes it easier to update your backend in the future - you can simply push changes to GitHub, and Render can automatically deploy the updates.
