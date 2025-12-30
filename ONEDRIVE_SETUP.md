# OneDrive Wedding Photos Integration Setup

This guide will help you set up the OneDrive integration for the wedding photos page.

## Overview

The wedding photos page is accessible at `/pages/WeddingPhotos` but doesn't appear in the navigation menu, making it a private/hidden page. It uses Microsoft Graph API to fetch photos from your OneDrive account.

## Prerequisites

- A Microsoft account with OneDrive
- Your wedding photos uploaded to a folder in OneDrive
- Access to Azure Portal (https://portal.azure.com)

## Step 1: Create an Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Configure the registration:
   - **Name**: Portfolio Wedding Photos (or any name you prefer)
   - **Supported account types**: Select "Accounts in this organizational directory only"
   - Click **Register**

## Step 2: Get Your Application Credentials

After registration, you'll be on the app's overview page:

1. Copy the **Application (client) ID** - you'll need this for `AZURE_CLIENT_ID`
2. Copy the **Directory (tenant) ID** - you'll need this for `AZURE_TENANT_ID`

## Step 3: Create a Client Secret

1. In your app registration, go to **Certificates & secrets**
2. Click **New client secret**
3. Add a description (e.g., "Portfolio Server")
4. Select an expiration period (recommended: 24 months)
5. Click **Add**
6. **IMPORTANT**: Copy the **Value** immediately - you'll need this for `AZURE_CLIENT_SECRET`
   - This value will only be shown once!

## Step 4: Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Select **Application permissions** (not Delegated)
5. Search for and add the following permissions:
   - `Files.Read.All` - Read files in all site collections
6. Click **Add permissions**
7. **IMPORTANT**: Click **Grant admin consent** (you must be an admin)
   - If you're not an admin, you'll need to ask your organization's admin to grant consent

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and fill in your credentials:
   ```env
   AZURE_TENANT_ID=your-tenant-id-from-step-2
   AZURE_CLIENT_ID=your-client-id-from-step-2
   AZURE_CLIENT_SECRET=your-client-secret-from-step-3
   ONEDRIVE_FOLDER_PATH=/WeddingPhotos
   ```

3. Update `ONEDRIVE_FOLDER_PATH` to match the path to your wedding photos folder in OneDrive
   - Example: `/Photos/Wedding` or `/Documents/WeddingPhotos`
   - Use the full path from the root of your OneDrive

## Step 6: Upload Your Wedding Photos

1. Upload your wedding photos to the folder specified in `ONEDRIVE_FOLDER_PATH`
2. Supported formats: JPG, PNG, GIF, and other common image formats
3. The photos will be displayed in the order they appear in OneDrive

## Step 7: Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```
   In another terminal, start the backend:
   ```bash
   npm start
   ```

2. Navigate to `http://localhost:3000/pages/WeddingPhotos`
3. You should see your wedding photos loading with infinite scroll

## Accessing the Wedding Photos Page

Since the page doesn't appear in the navigation menu, you can access it by:

1. **Direct URL**: Navigate to `/pages/WeddingPhotos`
2. **Share the link** with family and friends
3. **Bookmark** the page for easy access

## Troubleshooting

### "No photos loading"

- Check that your `.env` file has all the correct credentials
- Verify that the `ONEDRIVE_FOLDER_PATH` matches your OneDrive folder structure
- Check the server console for error messages
- Make sure admin consent was granted for the API permissions

### "Authentication error"

- Verify your `AZURE_CLIENT_SECRET` is correct (it's only shown once when created)
- Check that the tenant ID and client ID are correct
- Ensure the app registration is in the correct Azure AD tenant

### "Permission denied"

- Make sure you granted admin consent for the `Files.Read.All` permission
- Verify you selected **Application permissions** (not Delegated permissions)

### Node.js version warnings

The Azure Identity package prefers Node.js 20+. If you're using Node.js 18, the package should still work, but you may see warnings. To resolve this, consider upgrading to Node.js 20 or later.

## Security Notes

- Never commit your `.env` file to version control (it's already in `.gitignore`)
- Keep your client secret secure
- Consider using Azure Key Vault for production deployments
- Regularly rotate your client secrets

## Production Deployment

When deploying to production (e.g., Heroku):

1. Set environment variables in your hosting platform:
   - Heroku: `heroku config:set AZURE_TENANT_ID=your-value`
   - Other platforms: Use their environment variable configuration

2. Make sure all four environment variables are set:
   - `AZURE_TENANT_ID`
   - `AZURE_CLIENT_ID`
   - `AZURE_CLIENT_SECRET`
   - `ONEDRIVE_FOLDER_PATH`

3. Build and deploy your application as normal

## Additional Resources

- [Microsoft Graph API Documentation](https://docs.microsoft.com/en-us/graph/)
- [Azure AD App Registration Guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [Microsoft Graph Files API](https://docs.microsoft.com/en-us/graph/api/resources/onedrive)
