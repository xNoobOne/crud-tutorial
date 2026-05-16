import 'dotenv/config';

export default
  {
    "expo": {
      "name": "crud-tutorial",
      "slug": "crud-tutorial",
      "version": "1.0.0",
      "orientation": "portrait",
      "icon": "./assets/icon.png",
      "userInterfaceStyle": "light",
      "splash": {
        "image": "./assets/splash-icon.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
      },
      "ios": {
        "supportsTablet": true
      },
      "android": {
        "adaptiveIcon": {
          "backgroundColor": "#E6F4FE",
          "foregroundImage": "./assets/android-icon-foreground.png",
          "backgroundImage": "./assets/android-icon-background.png",
          "monochromeImage": "./assets/android-icon-monochrome.png"
        }
      },
      "web": {
        "favicon": "./assets/favicon.png"
      },
      extra: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
      },
    }
  }
