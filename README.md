# PropXchain

PropXchain is a blockchain-based property transaction platform that reduces completion times from 12-16 weeks to just 3-4 weeks while cutting direct costs by 48%.

## Website and Portal Demo

This repository contains both the PropXchain website and a demo of the PropXchain portal. The portal demo showcases the user interface and functionality of the blockchain-based property transaction platform.

## Features

- Informational website about PropXchain's services and benefits
- Interactive demo of the PropXchain portal with:
  - Dual interfaces for property developers and buyers
  - Document verification system with status tracking
  - Blockchain transaction visualization
  - Transaction timeline with milestone tracking
  - Secure messaging between parties

## Demo Portal

To access the demo portal, click the "Demo of Portal" button on the website or navigate to `/demo` directly.

### Demo Credentials

- **Developer Account**: emmadev / password123
- **Buyer Account**: jamesbrown / password123

## Deployment Instructions

### GitHub Deployment

1. Create a new repository on GitHub
2. Initialize Git in your project (if not already done):
   ```
   git init
   ```
3. Add your files:
   ```
   git add .
   ```
4. Commit your changes:
   ```
   git commit -m "Initial commit of PropXchain"
   ```
5. Connect to your GitHub repository:
   ```
   git remote add origin https://github.com/yourusername/PropXChain.git
   ```
6. Push your code:
   ```
   git push -u origin main
   ```

### Vercel Deployment

1. Go to [Vercel](https://vercel.com) and log in (or create an account)
2. Click "Add New" and select "Project"
3. Connect to your GitHub repository
4. Configure the following settings:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: npm install
5. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `EMAIL_SERVICE`: Your email service (e.g., gmail)
   - `EMAIL_USER`: Your email username
   - `EMAIL_PASSWORD`: Your email password
   - `ADMIN_USERNAME`: Admin username for accessing submissions
   - `ADMIN_PASSWORD`: Admin password for accessing submissions
6. Click "Deploy"

## Local Development

To run the project locally:

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email_username
   EMAIL_PASSWORD=your_email_password
   ADMIN_USERNAME=admin_username
   ADMIN_PASSWORD=admin_password
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/` - Main website files
- `/demo` - Portal demo files
- `/css` - Stylesheets
- `/js` - JavaScript files
- `/images` - Images and graphics
- `/documents` - Documentation files

## Contact

For more information, visit [www.propxchain.com](https://www.propxchain.com) or contact us at info@propxchain.co.uk.
