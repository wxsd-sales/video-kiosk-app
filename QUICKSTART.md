# Quick Start Guide

## 5-Minute Setup

### Step 1: Get Your API Tokens

1. **Webex Token** (expires in 12 hours - for testing only):
   - Visit: https://developer.webex.com/docs/getting-started
   - Sign in and copy your token

2. **OpenWeatherMap Token** (free):
   - Sign up: https://home.openweathermap.org/users/sign_up
   - Activate your account via email
   - Get API key: https://home.openweathermap.org/api_keys

3. **Webex Device ID**:
   ```bash
   curl https://webexapis.com/v1/devices \
     -H "Authorization: Bearer YOUR_WEBEX_TOKEN"
   ```
   Copy the `id` field from the response

### Step 2: Test Locally

1. Open `index.html` in your browser, or run:
   ```bash
   python3 -m http.server 8000
   ```

2. Navigate to:
   ```
   http://localhost:8000/?people=YOUR_EMAIL@company.com&owmToken=YOUR_OWM_TOKEN&webexToken=YOUR_WEBEX_TOKEN&deviceId=YOUR_DEVICE_ID&owmCityId=4366001
   ```

### Step 3: Deploy to GitHub Pages

1. **Create a new repository** under wxsd-sales organization

2. **Push your code**:
   ```bash
   cd /Users/tahanson/Documents/sales/video-kiosk-app
   git init
   git add .
   git commit -m "Initial kiosk demo"
   git branch -M main
   git remote add origin https://github.com/wxsd-sales/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to: `https://github.com/wxsd-sales/YOUR_REPO_NAME/settings/pages`
   - Source: **main** branch, **/ (root)** folder
   - Click **Save**

4. **Access your kiosk**:
   ```
   https://wxsd-sales.github.io/YOUR_REPO_NAME/?people=YOUR_EMAIL@company.com&owmToken=YOUR_OWM_TOKEN&webexToken=YOUR_WEBEX_TOKEN&deviceId=YOUR_DEVICE_ID
   ```

## Example Configuration

Replace with your values:

```
https://wxsd-sales.github.io/YOUR_REPO_NAME/?people=john.doe@company.com:1234,jane.smith@company.com:5678&background=https://your-company.com/office-bg.jpg&logo=https://your-company.com/logo.png&owmCityId=4366001&owmToken=abc123...&webexToken=xyz789...&deviceId=Y2lzY29...
```

### People Parameter Format

The `people` parameter format is:
```
people=email1:dialNumber1,email2:dialNumber2,email3:dialNumber3
```

Examples:
- Single person: `people=john@company.com`
- With dial number: `people=john@company.com:4075551234`
- Multiple people: `people=john@company.com:1234,jane@company.com:5678`

## Finding Your City ID

1. Search: https://openweathermap.org/find?q=YOUR_CITY
2. Click your city
3. Copy ID from URL

Common cities:
- Las Vegas, NV: `5506956`
- New York, NY: `5128581`
- San Francisco, CA: `5391959`
- London, UK: `2643743`
- Tokyo, Japan: `1850144`

## Production Considerations

⚠️ **For production use:**

1. **Webex Authentication**:
   - Personal tokens expire after 12 hours
   - Create a Webex Bot or Integration: https://developer.webex.com/docs/integrations
   - Implement OAuth flow for long-term use

2. **Secure Token Management**:
   - Don't expose tokens in public URLs
   - Use a backend proxy to handle API calls
   - Consider using environment-specific configurations

3. **Testing**:
   - Test on actual kiosk hardware
   - Verify touch screen compatibility
   - Check display resolution and scaling

## Support

- Webex API Docs: https://developer.webex.com/docs/api/getting-started
- OpenWeatherMap API: https://openweathermap.org/api
- GitHub Pages Docs: https://docs.github.com/en/pages

## Need Help?

1. Check browser console for errors (F12)
2. Verify all URL parameters are correct
3. Ensure tokens haven't expired
4. Check network requests in browser DevTools

