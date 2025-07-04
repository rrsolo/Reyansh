// Bubblio Configuration
// Update these values for your deployment

const CONFIG = {
    // YouTube Data API v3 Key
    // Get from: https://console.cloud.google.com/
    YOUTUBE_API_KEY: 'AIzaSyDlsqMzQBOW8rliC2BdpyBOV3Hs8_2bVDA',
    
    // Default Playlists (Replace with your own)
    PLAYLISTS: {
        'PLO2NpzUDdem0ZSJqOsKpJ7H1rikJTIX2d': 'Epic Learning Videos',
        'PLO2NpzUDdem3WVqnpyzHHlu_f8att4bsH': 'Legendary Adventures'
    },
    
    // App Settings
    DEFAULT_TIME_LIMIT: 0, // 0 = no limit, or 15, 30, 45, 60 minutes
    ENABLE_SOUNDS: true,
    ENABLE_DARK_MODE: false,
    
    // API Settings
    MAX_VIDEOS_PER_PLAYLIST: 50,
    API_RETRY_ATTEMPTS: 3,
    
    // Device Settings
    MOBILE_BREAKPOINT: 768,
    TV_BREAKPOINT: 1200
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}