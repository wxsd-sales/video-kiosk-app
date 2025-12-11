# 🚀 Start Here - wxsd-sales Deployment

## Your Kiosk is Ready to Deploy!

This vanilla JavaScript kiosk reception demo is configured for deployment to **wxsd-sales.github.io**.

---

## ⚡ Quick Start (3 Minutes)

### 1️⃣ Choose a Repository Name

Pick a name for your new repository (examples below):
- `kiosk-reception-vanilla`
- `kiosk-demo-js`  
- `reception-kiosk-simple`

### 2️⃣ Run the Deployment Script

```bash
cd /Users/tahanson/Documents/sales/video-kiosk-app
./deploy.sh video-kiosk-app
```

> **Note**: You can use `video-kiosk-app` or choose a different repository name

### 3️⃣ Enable GitHub Pages

After the script completes:

1. Go to: `https://github.com/wxsd-sales/YOUR_REPO_NAME/settings/pages`
2. Set Source to: **main** branch, **/ (root)** folder
3. Click **Save**
4. Wait 2-3 minutes

### 4️⃣ Access Your Kiosk

Your site will be live at:
```
https://wxsd-sales.github.io/YOUR_REPO_NAME/
```

Use the URL builder:
```
https://wxsd-sales.github.io/YOUR_REPO_NAME/EXAMPLE.html
```

---

## 📖 Full Documentation

| Document | Description |
|----------|-------------|
| **DEPLOY_WXSD.md** | wxsd-sales specific deployment guide |
| **README.md** | Complete documentation & features |
| **QUICKSTART.md** | 5-minute setup guide |
| **EXAMPLE.html** | Interactive URL builder tool |
| **PROJECT_SUMMARY.md** | Technical overview |

---

## 🎯 Example Usage

Once deployed, your kiosk URL will look like:

```
https://wxsd-sales.github.io/YOUR_REPO_NAME/?people=john.doe@cisco.com:1234,jane.smith@cisco.com:5678&background=https://example.com/office.jpg&logo=https://example.com/logo.png&owmCityId=4366001&owmToken=abc123&webexToken=xyz789&deviceId=Y2lzY29...
```

---

## ✅ What You Have

- ✅ Vanilla JavaScript (no build process)
- ✅ Works exactly like the Svelte version
- ✅ Ready for GitHub Pages
- ✅ URL-based configuration
- ✅ Weather from OpenWeatherMap
- ✅ Webex presence & calling
- ✅ Live clock
- ✅ Custom backgrounds & logos

---

## 🎨 Deployment Script Details

The `deploy.sh` script will:

1. ✅ Initialize git repository
2. ✅ Add and commit all files
3. ✅ Set up remote: `https://github.com/wxsd-sales/YOUR_REPO_NAME.git`
4. ✅ Push to main branch
5. ✅ Show you next steps

**Usage:**
```bash
./deploy.sh YOUR_REPO_NAME
```

---

## 📁 File Structure

```
video-kiosk-app/
├── index.html          # Main page (5.5KB)
├── app.js             # JavaScript logic (11KB)
├── styles.css         # Custom styling (1.7KB)
├── assets/            # Weather icons (11 SVG files)
├── EXAMPLE.html       # URL builder tool
├── deploy.sh          # Deployment script
├── DEPLOY_WXSD.md     # Your deployment guide
├── START_HERE.md      # This file
├── README.md          # Full documentation
├── QUICKSTART.md      # Quick setup
├── PROJECT_SUMMARY.md # Technical details
└── .gitignore         # Git ignore file
```

---

## 🔑 Required API Tokens

Before using, you'll need:

1. **Webex Token**: Get at [developer.webex.com](https://developer.webex.com/)
2. **OpenWeatherMap Token**: Sign up at [openweathermap.org](https://openweathermap.org/api)
3. **Webex Device ID**: Get from Webex API `/devices` endpoint

> Use **EXAMPLE.html** to build your URL with all parameters!

---

## 🆘 Need Help?

1. **General Setup**: See `README.md`
2. **Quick Start**: See `QUICKSTART.md`
3. **wxsd-sales Deployment**: See `DEPLOY_WXSD.md`
4. **Technical Details**: See `PROJECT_SUMMARY.md`

---

## 🎉 You're Ready!

Run this command to deploy:

```bash
cd /Users/tahanson/Documents/sales/video-kiosk-app
./deploy.sh video-kiosk-app
```

Then enable GitHub Pages and you're done! 🚀

