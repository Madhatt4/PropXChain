# Fixed n8n Workflow Configuration

## Corrected Node Setup:

### Node 1: Schedule Trigger ✅ (Already working)
- Keep your existing "Daily Check" node

### Node 2: Execute Command (Replace "Read PropXChain Folder")
**Node Type**: Execute Command
**Command**: `dir "C:\Users\Admin\Desktop\Propxchain\linkedin-content\*.md" /B /O:D`
**Alternative Linux/Mac**: `ls -t C:/Users/Admin/Desktop/Propxchain/linkedin-content/*.md`

This will list your markdown files in the folder.

### Node 3: Item Lists (Split file list)
**Node Type**: Item Lists
**Operation**: Split Out Items
This splits the file list into individual items.

### Node 4: Execute Command (Read individual files)
**Node Type**: Execute Command  
**Command**: `type "C:\Users\Admin\Desktop\Propxchain\linkedin-content\{{ $json.item }}"`
**Alternative Linux/Mac**: `cat "C:/Users/Admin/Desktop/Propxchain/linkedin-content/{{ $json.item }}"`

### Node 5: Process Content for LinkedIn ✅ (Keep existing)
**Node Type**: Code (JavaScript)

### Node 6: Post to LinkedIn ✅ (Keep existing) 
**Node Type**: LinkedIn

## Alternative Simpler Approach:
Use HTTP Request node to read a specific file by creating a local file server, or use a webhook approach.

## Recommended Fix:
1. Delete the problematic "Read PropXChain Folder" node
2. Add "Execute Command" node with the dir/ls command above
3. Connect it between "Daily Check" and the rest of your workflow
