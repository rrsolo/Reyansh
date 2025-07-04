# 🫧 Bubblio - Epic Kids Video App

A safe, child-friendly video streaming app designed for kids aged 3-10. Built with love by **RishiRohith** for his little brother.

## ✨ Features

- **� Safe Video Streaming**: Curated content via YouTube Data API v3
- **😎 Epic Profiles**: Custom profiles with favorite emojis and colors  
- **🫧 Bubble Animations**: Playful transitions and effects
- **📱 Multi-Device**: Optimized for Mobile, Android TV, and Desktop
- **🔊 Interactive**: Voice search, sound effects, and animations
- **⏰ Screen Time**: Built-in parental controls and time limits
- **🎨 Beautiful UI**: Colorful, kid-friendly design with epic emojis

## 🚀 GitHub Pages Deployment

### Prerequisites
- GitHub account
- YouTube Data API v3 key (see API Setup below)

### Quick Deploy Steps

1. **Fork/Clone this repository**
   ```bash
   git clone https://github.com/yourusername/bubblio.git
   cd bubblio
   ```

2. **Configure API Key**
   - Open `script.js`
   - Replace the API key on line 3:
   ```javascript
   const YOUTUBE_API_KEY = 'YOUR_API_KEY_HERE';
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
   - Click Save

4. **Access Your App**
   - Your app will be available at: `https://yourusername.github.io/bubblio`
   - Allow 5-10 minutes for initial deployment

## 🔑 YouTube Data API v3 Setup

### Get Your API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **YouTube Data API v3**
4. Go to Credentials → Create Credentials → API Key
5. Restrict the key (recommended):
   - HTTP referrers: Add your GitHub Pages domain
   - APIs: YouTube Data API v3 only

### Configure Playlists
Replace the playlist IDs in `script.js` (line 4-7):
```javascript
const PLAYLISTS = {
    'YOUR_PLAYLIST_ID_1': 'Epic Learning Videos',
    'YOUR_PLAYLIST_ID_2': 'Legendary Adventures'
};
```

## 📱 Device Support

### 📺 Android TV
- **Remote Navigation**: Full D-pad support
- **Voice Search**: "Say what you want!"
- **Large UI**: TV-optimized interface
- **Focus Management**: Clear visual indicators

### 📱 Mobile/Tablet
- **Touch Friendly**: Large buttons and touch targets
- **Swipe Gestures**: Swipe left/right for video navigation
- **Responsive Design**: Adapts to all screen sizes
- **Portrait Support**: Optimized layouts

### 💻 Desktop
- **Keyboard Shortcuts**: Full keyboard navigation
- **Mouse Support**: Click and hover interactions
- **Fullscreen**: F key for fullscreen videos

## 🎨 Customization

### Emojis & Colors
- Brother's favorite emojis are used throughout
- Color scheme: Deep Blues, Yellow, Green with black outlines
- Easy to modify in CSS variables (lines 9-19 in `style.css`)

### Playlists
- Currently supports 2 curated playlists
- Easy to add more in `script.js` PLAYLISTS object
- All content is filtered for safety

## 📁 File Structure

```
bubblio/
├── index.html          # Main HTML structure
├── style.css           # Complete styling and responsive design
├── script.js           # All functionality and API integration
├── README.md           # This file
└── assets/             # (Optional) Additional assets
```

## 🔧 Troubleshooting

### Videos Not Loading?
1. **Check API Key**: Ensure it's correctly set in `script.js`
2. **Check Quotas**: YouTube API has daily limits
3. **Check CORS**: Ensure referrer restrictions allow your domain
4. **Check Console**: Open browser dev tools for error messages

### Navigation Issues?
1. **Clear Cache**: Hard refresh (Ctrl+F5)
2. **Check JavaScript**: Ensure no console errors
3. **Check Playlists**: Ensure playlist IDs are valid and public

### Mobile Issues?
1. **Test Touch**: Ensure touch events work properly
2. **Check Viewport**: Meta viewport tag should be present
3. **Test Orientation**: Both portrait and landscape should work

## 🌐 Browser Support

- ✅ **Chrome** (Recommended)
- ✅ **Firefox** 
- ✅ **Safari**
- ✅ **Edge**
- ✅ **Mobile Browsers**
- ✅ **Android TV Browser**

## 🚨 Important Notes

### Privacy & Usage
- **Personal Project**: Not for commercial use or app stores
- **Family Use**: Designed specifically for safe family viewing
- **No Data Collection**: All data stored locally in browser
- **YouTube API**: Respects YouTube's terms of service

### Performance
- **Online Only**: Requires internet connection for video loading
- **API Limits**: YouTube API has daily quotas (10,000 units/day default)
- **Caching**: Videos are not cached locally for safety

## 📞 Support

This is a personal project made with ❤️. For issues:
1. Check this README first
2. Look at browser console for errors
3. Verify API key and quotas
4. Test with different browsers

## 🎯 Made with Love

Created by **RishiRohith** as a personal project for his little brother. The app focuses on providing a safe, fun, and educational video experience for young children.

---

**Remember**: This app requires the YouTube Data API v3 to function and must be hosted online to work properly due to CORS restrictions.

Enjoy the epic video fun! 🎬✨