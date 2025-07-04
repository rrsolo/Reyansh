# 🎬 CritterTube - Safe Video Fun for Kids

A secure, child-friendly video streaming web application designed specifically for children aged 3-10 years. CritterTube provides a curated, safe, and engaging video viewing experience by exclusively streaming videos from pre-defined YouTube playlists.

## ✨ Features

### 🎨 Child-Friendly Design
- **Vibrant Interface**: Colorful, animated design with soft animal emoji backgrounds
- **Intuitive Navigation**: Large buttons and simple controls designed for young children
- **Animated Backgrounds**: Floating animal emojis with subtle animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 👤 Profile Management
- **Guest Mode**: Instant access without creating an account
- **Custom Profiles**: Create personalized profiles with:
  - Custom names
  - Animal emoji avatars (🐶🐱🐼🐵🐰🦊🐸🐢)
  - Favorite color themes
  - Local storage (no data sent to servers)
- **Multiple Profiles**: Support for multiple children on the same device

### 🛡️ Safety Features
- **Curated Content**: Only videos from pre-approved YouTube playlists
- **No Ads**: Clean interface without advertisements
- **No Comments**: Comments section completely hidden
- **No Recommendations**: Prevents access to unvetted content
- **Sandboxed Player**: Secure YouTube iframe integration
- **Parent Lock**: Math-based verification for sensitive settings

### ⏰ Screen Time Controls
- **Time Limits**: Set viewing time limits (15, 30, 45, or 60 minutes)
- **Break Reminders**: Friendly notifications when time limits are reached
- **Extension Options**: Children can request 5 more minutes
- **Automatic Tracking**: Real-time monitoring of viewing time

### 🎵 Audio & Visual Experience
- **UI Sounds**: Pleasant sound effects for interactions
- **Volume Control**: Easy mute/unmute functionality
- **Dark Mode**: Eye-friendly dark theme option
- **Smooth Animations**: Engaging transitions and effects

### 🎮 Advanced Controls
- **Keyboard Navigation**:
  - `Space` - Play/Pause
  - `Arrow Left` - Previous video
  - `Arrow Right` - Next video
  - `F` - Fullscreen
  - `Escape` - Exit fullscreen
- **Touch/Swipe Support**: Swipe left/right to change videos on mobile
- **Voice Commands**: Basic voice control support (Chrome only)
- **Fullscreen Mode**: Immersive viewing experience

### 📺 Video Features
- **Auto-Play**: Seamless transition between videos in playlist
- **Quality Selection**: Automatic quality adjustment
- **Thumbnail Preview**: Visual video selection grid
- **Progress Tracking**: Remember playback position
- **Error Handling**: Graceful handling of unavailable videos

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for YouTube content
- YouTube Data API key (provided)

### Installation
1. Download all files to a directory
2. Open `index.html` in a web browser, or
3. Run a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

### First Time Setup
1. **Welcome Screen**: Choose between Guest Mode or Create Profile
2. **Profile Creation** (optional):
   - Enter child's name
   - Select favorite animal emoji
   - Pick favorite color
3. **Start Watching**: Begin enjoying safe, curated videos!

## 🎯 How to Use

### For Children
1. **Start**: Click "Guest Mode" or select your profile
2. **Browse**: Look at video thumbnails and click to watch
3. **Watch**: Use simple controls (play, pause, next, previous)
4. **Enjoy**: Videos automatically play one after another

### For Parents
1. **Settings**: Click the ⚙️ gear icon in the top right
2. **Screen Time**: Set time limits for viewing sessions
3. **Playlist**: Choose between different age-appropriate playlists
4. **Parent Lock**: Access advanced settings with math verification
5. **Profiles**: Manage, edit, or delete child profiles

## 🔧 Configuration

### Playlists
The app comes configured with two playlists:
- **Fun Learning Videos**: Educational content for younger children
- **Educational Adventures**: More advanced educational content

### Settings Options
- **Appearance**: Light/Dark mode toggle
- **Audio**: Enable/disable UI sounds
- **Screen Time**: 15, 30, 45, or 60-minute limits
- **Playlist Selection**: Switch between available playlists
- **Profile Management**: Edit, switch, or delete profiles

## 🛡️ Safety Measures

### Content Control
- Videos sourced only from approved YouTube playlists
- No access to YouTube's recommendation algorithm
- No ads, comments, or external links
- Sandboxed iframe prevents navigation away from content

### Privacy Protection
- All data stored locally (no server uploads)
- No personal information collection
- No tracking or analytics
- No account creation required

### Parental Controls
- Math-based parent verification system
- Screen time limit enforcement
- Playlist switching restrictions
- Profile management controls

## 📱 Technical Details

### Browser Compatibility
- **Recommended**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Android Chrome
- **Requirements**: JavaScript enabled, local storage support

### APIs Used
- **YouTube Data API v3**: For playlist content fetching
- **YouTube IFrame API**: For secure video playback
- **Web Audio API**: For UI sound effects
- **Local Storage API**: For profile and settings persistence

### Performance
- **Lazy Loading**: Video thumbnails load as needed
- **Responsive Images**: Optimized thumbnail sizes
- **Minimal API Calls**: Efficient YouTube API usage
- **Local Caching**: Settings and profiles stored locally

## 🎨 Customization

### Adding New Playlists
1. Locate the `PLAYLISTS` object in `script.js`
2. Add new playlist ID and name:
   ```javascript
   const PLAYLISTS = {
       'PLAYLIST_ID_1': 'Playlist Name 1',
       'PLAYLIST_ID_2': 'Playlist Name 2',
       'NEW_PLAYLIST_ID': 'New Playlist Name'
   };
   ```

### Modifying Colors
1. Edit CSS custom properties in `style.css`:
   ```css
   :root {
       --primary-color: #FF6B6B;
       --secondary-color: #4ECDC4;
       /* Add more color customizations */
   }
   ```

### Adding New Emojis
1. Add emoji options in the HTML:
   ```html
   <div class="emoji-option" data-emoji="🦁">🦁</div>
   ```

## 🔍 Troubleshooting

### Common Issues

**Videos not loading:**
- Check internet connection
- Verify YouTube API key is valid
- Ensure playlist is public and contains videos

**Sounds not working:**
- Check if browser allows autoplay
- Verify device volume is up
- Try refreshing the page

**Profiles not saving:**
- Ensure browser supports local storage
- Check if private/incognito mode is disabled
- Clear browser cache and try again

**Touch controls not working:**
- Make sure you're swiping horizontally
- Try tapping instead of swiping
- Refresh the page and try again

## 🆘 Support

### Browser Requirements
- JavaScript must be enabled
- Local storage must be allowed
- Pop-ups should be allowed for fullscreen

### API Limitations
- YouTube API has daily quotas
- Some videos may be region-restricted
- Playlist changes may take time to appear

## 🎉 Features Roadmap

### Planned Enhancements
- [ ] Multi-language support
- [ ] Offline video caching
- [ ] Progress sharing between devices
- [ ] Advanced parental dashboard
- [ ] Custom playlist creation
- [ ] Educational progress tracking

## 📄 License

This project is designed for educational and family use. Please ensure compliance with YouTube's Terms of Service when using their API and content.

## 🤝 Contributing

This is a complete, standalone application designed for family use. Feel free to customize and enhance it for your specific needs!

---

**Enjoy safe, educational video fun with CritterTube! 🎬🐶🐱🐼**