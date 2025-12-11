# Kiosk Reception Demo - Vanilla JavaScript Version

A clean, single-page web application for kiosk reception displays. Shows weather information, employee presence cards, and enables calling via Webex.

## Features

- **Weather Display**: Real-time weather from OpenWeatherMap
- **Employee Cards**: Display employee information with presence status from Webex
- **One-Click Calling**: Direct SIP calling through Webex devices
- **Clock**: Live date and time display
- **Customizable**: Configure via URL parameters (background, logo, people, etc.)

## Technology Stack

- Pure HTML, CSS, and JavaScript (no build process required!)
- [Bulma CSS Framework](https://bulma.io/) (via CDN)
- [Material Design Icons](https://materialdesignicons.com/) (via CDN)
- Client-side only - perfect for GitHub Pages

## Deployment to GitHub Pages

### Option 1: Quick Deploy (Recommended)

1. **Create a new GitHub repository** under wxsd-sales organization

2. **Upload the files** to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/wxsd-sales/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub: `https://github.com/wxsd-sales/YOUR_REPO_NAME`
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Select **/ (root)** folder
   - Click **Save**

4. **Access your site**:
   - Your site will be available at: `https://wxsd-sales.github.io/YOUR_REPO_NAME/`
   - Add URL parameters to configure (see below)

### Option 2: Deploy to GitHub Pages with Custom Domain

Follow Option 1, then:

1. In repository Settings → Pages, add your custom domain
2. Configure your DNS provider to point to GitHub Pages:
   - Add a CNAME record pointing to `YOUR_USERNAME.github.io`
3. Wait for DNS propagation (can take up to 24 hours)

## URL Parameters

Configure the kiosk by adding URL parameters:

### Required Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `webexToken` | Webex API access token | `webexToken=YOUR_TOKEN` |
| `deviceId` | Webex device ID for making calls | `deviceId=Y2lzY29zcGFyazovL...` |
| `owmToken` | OpenWeatherMap API token | `owmToken=YOUR_API_KEY` |
| `people` | Comma-separated list of email:number pairs | `people=john@example.com:1234,jane@example.com:5678` |

### Optional Parameters

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `background` | URL to background image | Unsplash default | `background=https://example.com/bg.jpg` |
| `logo` | URL to logo image | Cisco logo | `logo=https://example.com/logo.png` |
| `owmCityId` | OpenWeatherMap city ID | 5506956 (Las Vegas) | `owmCityId=4366001` |

### Example URL

```
https://wxsd-sales.github.io/YOUR_REPO_NAME/?people=john.doe@company.com:4075579825,jane.smith@company.com:4075579826&background=https://example.com/office.jpg&owmCityId=4366001&owmToken=YOUR_OWM_TOKEN&webexToken=YOUR_WEBEX_TOKEN&deviceId=YOUR_DEVICE_ID&logo=https://example.com/logo.svg
```

## Getting API Tokens

### Webex Token

1. Go to [developer.webex.com](https://developer.webex.com/)
2. Sign in with your Webex account
3. Click on your profile → "Getting Started"
4. Copy your personal access token
   - **Note**: Personal tokens expire after 12 hours
   - For production, create a [Webex Bot](https://developer.webex.com/docs/bots) or use [OAuth](https://developer.webex.com/docs/integrations)

### Webex Device ID

1. Use the Webex API to list devices:
   ```bash
   curl https://webexapis.com/v1/devices \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```
2. Find your device in the response and copy its `id`

### OpenWeatherMap Token

1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Go to your [API keys page](https://home.openweathermap.org/api_keys)
3. Generate a new API key
4. Free tier includes 1,000 calls/day

### OpenWeatherMap City ID

1. Search for your city at [openweathermap.org/find](https://openweathermap.org/find)
2. Click on your city
3. Copy the city ID from the URL (e.g., `openweathermap.org/city/4366001`)

## Local Development

No build process needed! Just open `index.html` in a browser:

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server (recommended)
python -m http.server 8000
# or
npx http-server

# Then visit: http://localhost:8000
```

Add URL parameters for testing:
```
http://localhost:8000/?people=test@example.com&owmToken=YOUR_TOKEN&webexToken=YOUR_TOKEN&deviceId=YOUR_DEVICE
```

## File Structure

```
kiosk-reception-demo-vanilla/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── app.js             # Application logic
├── assets/            # Weather icon SVGs
│   ├── 01d.svg
│   ├── 01n.svg
│   ├── 02d.svg
│   └── ...
└── README.md          # This file
```

## Customization

### Change Colors

Edit `styles.css` and modify the CSS variables or Bulma classes.

### Add More Weather Info

Edit `app.js` → `fetchWeather()` function to display additional data from the OpenWeatherMap API response.

### Modify Person Card Layout

Edit `app.js` → `updatePersonCard()` function to change the card HTML structure.

### Update Refresh Intervals

In `app.js`, modify these values:
```javascript
setInterval(fetchWeather, 3600000);      // Weather: 1 hour
setInterval(() => { ... }, 3600000);     // Person data: 1 hour
```

## Browser Support

Works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Security Notes

⚠️ **Important**: Never commit API tokens to your repository!

- Use URL parameters to pass tokens (they won't be in your code)
- For production, consider:
  - Using a backend proxy to hide tokens
  - Implementing proper Webex OAuth flow
  - Using environment-specific configurations

## Troubleshooting

### Weather not loading
- Check that `owmToken` is valid
- Verify `owmCityId` is correct
- Check browser console for errors

### Person cards not loading
- Verify `webexToken` is valid and not expired
- Check email addresses are correct
- Ensure token has proper scopes

### Calling doesn't work
- Confirm `deviceId` is correct
- Verify device is online and registered
- Check that `webexToken` has xAPI permissions

### Images not loading
- Ensure URLs are publicly accessible
- Check for HTTPS (mixed content issues)
- Verify CORS settings on image hosts

## License

This is a demo application. Modify and use as needed.

## Credits

- Built for WXSD-Sales demos
- Weather icons from [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Material Design Icons](https://materialdesignicons.com/)
- CSS framework: [Bulma](https://bulma.io/)

---

**Original Svelte version**: This is a rewrite of the original Svelte-based kiosk demo, converted to vanilla JavaScript for easier deployment and maintenance.

