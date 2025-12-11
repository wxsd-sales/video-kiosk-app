# Video Kiosk App - Vanilla JavaScript Version

A clean, single-page web application for kiosk reception displays. Shows weather information, employee presence cards, and enables calling via Webex.
This is a proof-of-concept application that is intended to be used as a simple reception desk Kiosk on a Cisco RoomOS device in Kiosk/PWA mode.

<p align="center">
   <a href="https://app.vidcast.io/share/bb910329-f398-4f04-baec-18ddaf46f493" target="_blank">
       <img src="https://github.com/wxsd-sales/kiosk-reception-demo/assets/6129517/5e99058f-d4fd-4973-aaae-0d768f10837f" alt="kiosk-reception-demo"/>
    </a>
</p>

## Overview

This application allows you to customize the contact cards, brand logo, background, etc. that make up the UI/controls of a RoomOS device in PWA/Kiosk device. You can create multiple URLs and activate them on a compatible device of your choice. Once activated, the application uses [cloud xAPI requests](https://roomos.cisco.com/docs/Introduction.md#the-xapi) with a Webex Bot token to control the device (make calls, etc.).

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

## Setup

These instructions assume that you have administrator access to an Org's Webex Control Hub and a compatible RoomOS 11 device **in a shared workspace**.

1. Create a [Webex Bot Token](https://developer.webex.com/my-apps/new/bot) and [give it full access to your device](https://developer.webex.com/docs/devices#giving-a-bot-or-user-access-to-the-xapi-of-a-device). Note the bot token in a notepad as `WEBEX_TOKEN`.

2. Create a [OWM account](https://home.openweathermap.org/users/sign_up) and get the API token for weather data lookup. You can find the key on your account page under the ["API key"](https://home.openweathermap.org/api_keys) tab. Note the OWM token in a notepad as `OWM_TOKEN`.

3. Note the device identifier by executing the [List Devices API request](https://developer.webex.com/docs/api/v1/devices/list-devices) on the Webex developer portal, it’s the `id` field in the response as `DEVICE_ID`.

4. Create the URL for the reception kiosk by replacing the appropriate values below; you can have as many people as you want. Those are separated by a comma "`,`" and a corresponding Webex Calling extension/number/sip address can be provided by a colon "`:`". For example:

   ```text
   https://wxsd-sales.github.io/video-kiosk-app?people=john@pubhub-01.wbx.ai:0610,jane@pubhub-01.wbx.ai:1006&background=https://cf-images.us-east-1.prod.boltdns.net/v1/static/1384193102001/46e1a133-643e-435c-b073-8fd26be857e7/757bc84f-02c4-4468-b90b-7f097d265106/1280x720/match/image.jpg&logo=https://www.webexone.com/content/dam/www/us/en/images/webexone/2024/save-the-date/webexone24-logo-white.svg&owmCityId=4164138&owmToken=OWM_TOKEN&webexToken=WEBEX_TOKEN&deviceId=DEVICE_ID
   ```

5. Visit the org's [Control Hub device page](https://admin.webex.com/devices), choose your device and make the following changes using the "All configuration" link:
   - Set the value for `NetworkServices > HTTP > Mode` to `HTTP+HTTPS`
   - Set the value for `WebEngine > Mode` to `On`
   
   Additionally, if running in Kiosk Mode (Desk and Board series devices):
   - Set the value for `UserInterface > Kiosk > URL` to the URL you created in Step 4 above
   - Set the value for `UserInterface > Kiosk > Mode` to `On`

   Additionally, if running in PWA Mode (Room series devices):
   - Set the value for `WebEngine > Features > Xapi.Peripherals.AllowedHosts.Hosts` to `*`
   - Set the value for `UserInterface > HomeScreen.Peripherals.WebApp.URL` to the URL you created in Step 4 above


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
https://wxsd-sales.github.io/video-kiosk-app/?people=john.doe@company.com:4075579825,jane.smith@company.com:4075579826&background=https://example.com/office.jpg&owmCityId=4366001&owmToken=YOUR_OWM_TOKEN&webexToken=YOUR_WEBEX_TOKEN&deviceId=YOUR_DEVICE_ID&logo=https://example.com/logo.svg
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

## Browser Support

Works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

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

## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=Video%20Kiosk%20App)

**Original Svelte version**: This is a rewrite of the original Svelte-based kiosk demo, converted to vanilla JavaScript for easier deployment and maintenance.

