# Setting Up Environment Variables in Render

The error message you're seeing indicates that the MongoDB connection string is not being properly set in your Render deployment. Here's how to fix it:

## Add Environment Variables in Render

1. Go to your Render dashboard: https://dashboard.render.com/

2. Click on your `propxchain-backend` service

3. Click on the "Environment" tab

4. Add the following environment variables:

   - **Key**: `MONGODB_URI`  
     **Value**: `mongodb+srv://marchatton:Marc2711@cluster0.elgpsni.mongodb.net/propxchain`

   - **Key**: `EMAIL_SERVICE`  
     **Value**: `outlook`

   - **Key**: `EMAIL_USER`  
     **Value**: `marchatton@hotmail.co.uk`

   - **Key**: `EMAIL_PASSWORD`  
     **Value**: `Drew1806//!`

   - **Key**: `NODE_ENV`  
     **Value**: `production`

5. Click "Save Changes"

6. After saving, click on the "Manual Deploy" button and select "Deploy latest commit"

7. Wait for the deployment to complete

## Verify the Connection

After the deployment is complete, you can verify that the MongoDB connection is working by:

1. Checking the logs in the Render dashboard
2. Visiting your backend URL (e.g., https://propxchain-backend.onrender.com/) to see the health check response
3. Testing the contact form on your website

## Troubleshooting

If you're still having issues:

1. Double-check that the environment variables are correctly set in Render
2. Make sure there are no typos in the MongoDB connection string
3. Verify that your MongoDB Atlas cluster is running and accessible
4. Check if your MongoDB Atlas cluster has IP restrictions that might be blocking connections from Render

## Important Note

The `.env` file in your repository is not used by Render. Render uses the environment variables that you set in the Render dashboard. This is why you need to manually add the environment variables in the Render dashboard.
