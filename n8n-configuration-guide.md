# n8n Configuration Guide for PropXChain LinkedIn Automation

## Node Configuration Instructions

### 1. "Read PropXChain Folder" Node Configuration
- **Operation**: Read Folder
- **Path**: `C:\Users\Admin\Desktop\Propxchain\linkedin-content`
- **File Extensions Filter**: `md,txt,json`
- **Include Subfolders**: Yes

### 2. "Check Recent Changes" Node Configuration
- **Condition Type**: DateTime
- **Left Value**: `{{ $json.modifiedTime }}`
- **Operation**: After
- **Right Value**: `{{ $now.minus({hours: 24}).toISO() }}`

### 3. "Read File Content" Node Configuration
- **Operation**: Read File
- **File Path**: `{{ $json.path }}`

### 4. "Process Content for LinkedIn" Node Configuration
**JavaScript Code to use:**

```javascript
// Extract key information from PropXChain files
const content = $input.first().json.content;
const fileName = $input.first().json.name;

// PropXChain specific content processing
let postContent = '';

if (fileName.includes('weekly-updates') || fileName.includes('milestones')) {
  // Extract meaningful content for LinkedIn
  const lines = content.split('\n').filter(line => line.trim());
  
  // Look for key sections with emojis and achievements
  const highlights = lines.filter(line => 
    line.includes('✅') || 
    line.includes('🚀') || 
    line.includes('🏆') ||
    line.includes('📈') ||
    line.includes('🎯') ||
    line.includes('💰') ||
    line.startsWith('##') ||
    line.toLowerCase().includes('milestone') ||
    line.toLowerCase().includes('achievement')
  );
  
  if (highlights.length > 0) {
    // Create engaging LinkedIn post
    const title = highlights.find(h => h.startsWith('##')) || '🏠 PropXChain Update!';
    const keyPoints = highlights.filter(h => h.includes('✅')).slice(0, 3);
    const hashtags = '#PropTech #Blockchain #RealEstate #Innovation #PropertyTech #DigitalTransformation';
    
    postContent = `${title.replace('##', '🚀')}\n\n${keyPoints.join('\n')}\n\n🔗 Transforming UK property transactions: 12-16 weeks → 3-4 weeks\n💰 48% cost reduction achieved\n\n${hashtags}`;
  } else {
    // Fallback content
    postContent = `🏠 PropXChain Progress Update!\n\n🚀 Revolutionizing UK property transactions with blockchain technology\n✅ Reducing completion times from 12-16 weeks to 3-4 weeks\n💰 Cutting direct costs by 48%\n\n#PropTech #Blockchain #RealEstate #Innovation`;
  }
}

return [{
  postText: postContent,
  fileName: fileName,
  originalContent: content.substring(0, 500)
}];
```

### 5. "Post to LinkedIn" Node Configuration
- **Resource**: Share
- **Operation**: Create
- **Text**: `{{ $json.postText }}`
- **Visibility**: PUBLIC
- **Credentials**: Your LinkedIn OAuth2 API credentials

## LinkedIn API Setup Required

Before the workflow can post, you need to:

1. Go to LinkedIn Developer Portal: https://developer.linkedin.com/
2. Create a new app for PropXChain
3. Request "Share on LinkedIn" product access
4. Get your Client ID and Client Secret
5. Add these to n8n credentials

## Testing the Workflow

1. Update one of the content files in `/linkedin-content/`
2. Run the workflow manually
3. Check your LinkedIn company page for the post
4. Adjust the JavaScript code as needed for your preferred format
