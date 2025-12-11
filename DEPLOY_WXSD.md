# Deployment Guide for wxsd-sales Organization

This guide is specifically for deploying to the **wxsd-sales** GitHub organization.

## Quick Deploy (3 minutes)

### Step 1: Choose a Repository Name

Pick a descriptive name for your repository, for example:
- `kiosk-reception-vanilla`
- `kiosk-demo-vanilla`
- `reception-kiosk-v2`

### Step 2: Run the Deploy Script

```bash
cd /Users/tahanson/Documents/sales/video-kiosk-app
./deploy.sh YOUR_REPO_NAME
```

Example:
```bash
./deploy.sh video-kiosk-app
```

The script will:
- ✅ Initialize git
- ✅ Commit your files
- ✅ Push to `https://github.com/wxsd-sales/YOUR_REPO_NAME`

### Step 3: Enable GitHub Pages

1. Go to: `https://github.com/wxsd-sales/YOUR_REPO_NAME/settings/pages`
2. Under "Source", select:
   - Branch: **main**
   - Folder: **/ (root)**
3. Click **Save**
4. Wait 2-3 minutes for deployment

### Step 4: Access Your Site

Your kiosk will be live at:
```
https://wxsd-sales.github.io/YOUR_REPO_NAME/
```

## Manual Deployment

If you prefer to deploy manually:

```bash
cd /Users/tahanson/Documents/sales/video-kiosk-app

# Initialize repository
git init
git add .
git commit -m "Deploy kiosk reception demo"
git branch -M main

# Add remote (replace YOUR_REPO_NAME)
git remote add origin https://github.com/wxsd-sales/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

Then follow Step 3 above to enable GitHub Pages.

## Example URLs

### Using your deployed kiosk:

```
https://wxsd-sales.github.io/YOUR_REPO_NAME/?people=john.doe@company.com:1234,jane.smith@company.com:5678&background=https://example.com/bg.jpg&logo=https://example.com/logo.png&owmCityId=4366001&owmToken=YOUR_OWM_TOKEN&webexToken=YOUR_WEBEX_TOKEN&deviceId=YOUR_DEVICE_ID
```

### URL Builder Tool:

```
https://wxsd-sales.github.io/YOUR_REPO_NAME/EXAMPLE.html
```

## Suggested Repository Names

Choose one of these or create your own:

- `video-kiosk-app` - Video kiosk application (recommended!)
- `kiosk-reception-vanilla` - Generic vanilla JS version
- `kiosk-demo-js` - JavaScript demo version
- `reception-kiosk-simple` - Simple version indicator
- `kiosk-reception-v2` - Version 2 indicator

## Repository Settings Recommendations

After deployment, consider these settings:

### About Section
- Description: "Kiosk reception demo - vanilla JavaScript version"
- Website: `https://wxsd-sales.github.io/YOUR_REPO_NAME/`
- Topics: `kiosk`, `webex`, `javascript`, `github-pages`, `demo`

### Branch Protection (Optional)
If this is a shared project:
- Go to Settings → Branches
- Add rule for `main` branch
- Enable "Require pull request reviews before merging"

## Updating Your Deployment

When you make changes:

```bash
git add .
git commit -m "Update kiosk configuration"
git push origin main
```

GitHub Pages will automatically rebuild (takes 2-3 minutes).

## Troubleshooting

### Repository doesn't exist
Make sure you have permissions to create repositories under wxsd-sales organization.

### Pages not showing
1. Check Settings → Pages shows green deployment
2. Wait 2-3 minutes after enabling
3. Clear browser cache
4. Check repository is public or Pages is enabled for private repos

### 404 errors on assets
Ensure all file paths use relative paths (no leading `/`).

## Need Help?

- **GitHub Pages Status**: Check your deployments at `https://github.com/wxsd-sales/YOUR_REPO_NAME/deployments`
- **Build Logs**: Click on a deployment to see logs
- **Pages Settings**: `https://github.com/wxsd-sales/YOUR_REPO_NAME/settings/pages`

## Production Checklist

Before going live:
- [ ] Test URL with all parameters
- [ ] Verify weather displays correctly
- [ ] Test person cards load
- [ ] Test calling functionality
- [ ] Add proper error handling for missing parameters
- [ ] Document your specific configuration
- [ ] Set up Webex OAuth for long-term tokens
- [ ] Configure custom domain (optional)

---

**Organization**: wxsd-sales  
**Your Site**: `https://wxsd-sales.github.io/YOUR_REPO_NAME/`  
**Repository**: `https://github.com/wxsd-sales/YOUR_REPO_NAME`

