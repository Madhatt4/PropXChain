# Test n8n Folder Reading

## Test if n8n can read your content folder:

import os
import json
from datetime import datetime, timedelta

# Path that n8n will use
folder_path = r"C:\Users\Admin\Desktop\Propxchain\linkedin-content"

print(f"Checking folder: {folder_path}")
print(f"Folder exists: {os.path.exists(folder_path)}")

if os.path.exists(folder_path):
    print("\nFiles in folder:")
    for file in os.listdir(folder_path):
        if file.endswith(('.md', '.txt')):
            file_path = os.path.join(folder_path, file)
            mod_time = os.path.getmtime(file_path)
            mod_date = datetime.fromtimestamp(mod_time)
            
            # Check if modified in last 24 hours
            is_recent = mod_date > (datetime.now() - timedelta(hours=24))
            
            print(f"  {file}")
            print(f"    Modified: {mod_date}")
            print(f"    Recent (24h): {is_recent}")
            print(f"    Size: {os.path.getsize(file_path)} bytes")
            print()

print("\nThis simulates what n8n will see when it reads your folder.")
