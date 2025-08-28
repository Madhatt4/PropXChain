# LinkedIn API Credentials for n8n Configuration

## Your LinkedIn App Credentials:
- **Client ID**: 78q04vo4x8wpzm
- **Client Secret**: WPL_AP1.GTevCaldFHK4S8oa... (use the full secret from LinkedIn)

## n8n Configuration Steps:

### 1. LinkedIn OAuth2 API Credential Setup:
1. In n8n, click on the "Post to LinkedIn" node
2. Click the gear icon next to "Credentials"
3. Select "Create New" → "LinkedIn OAuth2 API"
4. Enter the following:
   - **Client ID**: 78q04vo4x8wpzm
   - **Client Secret**: [Copy the full secret from LinkedIn developer portal]
   - **Auth URI**: https://www.linkedin.com/oauth/v2/authorization
   - **Access Token URI**: https://www.linkedin.com/oauth/v2/accessToken
   - **Scope**: w_member_social,r_liteprofile,r_emailaddress

### 2. Redirect URL to Add in LinkedIn:
- Go to LinkedIn Developer Portal → Auth tab
- Add this redirect URL: http://localhost:5678/rest/oauth2-credential/callback

### 3. Node Configuration Summary:
- **Daily Check**: Schedule trigger (every 24 hours)
- **Read PropXChain Folder**: Path = C:/Users/Admin/Desktop/Propxchain/linkedin-content
- **Check Recent Changes**: Filter files modified in last 24 hours
- **Read File Content**: Extract content from markdown files
- **Process Content**: Convert to LinkedIn-ready format
- **Post to LinkedIn**: Use OAuth2 credentials to post

## Ready to Configure!
