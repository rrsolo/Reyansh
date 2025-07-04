// CritterTube - Child-Friendly Video Streaming App
// Global Variables
const YOUTUBE_API_KEY = 'AIzaSyCRp1Gqj5yO2EHlUdlbTVipFWgFGAOM40Y';
const PLAYLISTS = {
    'PLO2NpzUDdem0ZSJqOsKpJ7H1rikJTIX2d': 'Fun Learning Videos',
    'PLO2NpzUDdem3WVqnpyzHHlu_f8att4bsH': 'Educational Adventures'
};

let currentPlaylist = 'PLO2NpzUDdem0ZSJqOsKpJ7H1rikJTIX2d';
let currentVideoIndex = 0;
let videos = [];
let player = null;
let currentProfile = null;
let screenTimeTimer = null;
let screenTimeStarted = null;
let timeLimit = 0; // in minutes
let soundsEnabled = true;
let parentLockAnswer = null;

// App State
let currentScreen = 'welcome-screen';

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check for existing profiles
    checkExistingProfiles();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load settings
    loadSettings();
    
    // Initialize YouTube API
    if (typeof YT !== 'undefined' && YT.Player) {
        onYouTubeIframeAPIReady();
    }
    
    // Play welcome sound
    playSound('welcome');
    
    // Initialize mascot messages
    initializeMascot();
}

// Mascot functionality
function initializeMascot() {
    const mascotMessages = [
        "Hi there! Pick a video to watch! 🎬",
        "Want to learn something new today? 📚",
        "Music videos are super fun! 🎵",
        "Let's watch something awesome! ⭐",
        "Time for some educational fun! 🎓",
        "What sounds interesting to you? 🤔"
    ];
    
    setInterval(() => {
        if (currentScreen === 'main-app') {
            updateMascotMessage(mascotMessages[Math.floor(Math.random() * mascotMessages.length)]);
        }
    }, 10000); // Change message every 10 seconds
}

function updateMascotMessage(message) {
    const mascotMessage = document.getElementById('mascot-message');
    if (mascotMessage) {
        mascotMessage.textContent = message;
        playSound('mascot');
    }
}

// Category selection
function selectCategory(category) {
    // Update active category
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter videos (for now, just reload all - in real app would filter by category)
    loadVideos();
    playSound('category-select');
    
    // Update mascot message based on category
    const categoryMessages = {
        'all': "Great choice! All videos are here! 🌟",
        'learning': "Time to learn something new! 📚",
        'music': "Let's dance and sing! 🎵",
        'shows': "Story time with fun shows! 📺",
        'games': "Fun and games ahead! 🎮"
    };
    
    updateMascotMessage(categoryMessages[category] || "Let's explore together! 🎭");
}

// Voice search functionality
function startVoiceSearch() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = function() {
            updateMascotMessage("I'm listening! Tell me what you want to watch! 👂");
            playSound('voice-start');
        };
        
        recognition.onresult = function(event) {
            const command = event.results[0][0].transcript.toLowerCase();
            handleVoiceSearch(command);
        };
        
        recognition.onerror = function(event) {
            updateMascotMessage("Sorry, I didn't understand. Try again! 😅");
            playSound('error');
        };
        
        recognition.start();
    } else {
        updateMascotMessage("Voice search isn't available on this device! 😔");
        showInfo("Voice search is not supported in this browser");
    }
}

function handleVoiceSearch(command) {
    updateMascotMessage(`You said: "${command}" - Searching for videos! 🔍`);
    
    // Simple keyword matching for categories
    if (command.includes('learn') || command.includes('education')) {
        selectCategory('learning');
    } else if (command.includes('music') || command.includes('song')) {
        selectCategory('music');
    } else if (command.includes('show') || command.includes('story')) {
        selectCategory('shows');
    } else if (command.includes('game') || command.includes('fun')) {
        selectCategory('games');
    } else if (command.includes('play') || command.includes('start')) {
        if (videos.length > 0) {
            playVideo(0);
        }
    } else {
        // Default to showing all videos
        selectCategory('all');
        updateMascotMessage("Here are all our awesome videos! 🎬");
    }
    
    playSound('voice-success');
}

// Video action buttons (placeholders for now)
function likeVideo() {
    showSuccess("Video liked! 👍");
    updateMascotMessage("Great choice! I'm glad you liked it! 😊");
    playSound('like');
}

function shareVideo() {
    showSuccess("Video shared with family! 📤");
    updateMascotMessage("Sharing is caring! Tell your family about it! 👨‍👩‍👧‍👦");
    playSound('share');
}

function saveVideo() {
    showSuccess("Video saved to your favorites! 💾");
    updateMascotMessage("Saved for later! You can watch it again anytime! ⭐");
    playSound('save');
}

function checkExistingProfiles() {
    const profiles = getProfiles();
    const existingBtn = document.getElementById('existing-profiles-btn');
    
    if (profiles.length > 0) {
        existingBtn.style.display = 'block';
    }
}

function initializeEventListeners() {
    // Profile setup emoji selector
    document.querySelectorAll('.emoji-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.emoji-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            playSound('click');
            addSparkleEffect(this);
        });
    });
    
    // Profile setup color selector
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            playSound('click');
            addSparkleEffect(this);
        });
    });
    
    // Add click sounds to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            playSound('click');
            addSparkleEffect(button);
        });
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Screen Management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
        playSound('transition');
    }
}

// Welcome Screen Functions
function startGuestMode() {
    currentProfile = {
        name: 'Guest',
        emoji: '🐶',
        color: '#FF6B6B',
        isGuest: true
    };
    updateCurrentProfile();
    showMainApp();
}

function showProfileSetup() {
    showScreen('profile-setup');
}

function showExistingProfiles() {
    loadExistingProfiles();
    showScreen('existing-profiles');
}

function showWelcome() {
    showScreen('welcome-screen');
}

// Profile Management
function createProfile() {
    const name = document.getElementById('profile-name').value.trim();
    const selectedEmoji = document.querySelector('.emoji-option.selected');
    const selectedColor = document.querySelector('.color-option.selected');
    
    if (!name) {
        showError('Please enter your name!');
        return;
    }
    
    if (!selectedEmoji) {
        showError('Please choose your animal friend!');
        return;
    }
    
    if (!selectedColor) {
        showError('Please pick your favorite color!');
        return;
    }
    
    const profile = {
        id: Date.now().toString(),
        name: name,
        emoji: selectedEmoji.dataset.emoji,
        color: selectedColor.dataset.color,
        createdAt: new Date().toISOString(),
        isGuest: false
    };
    
    saveProfile(profile);
    currentProfile = profile;
    updateCurrentProfile();
    showMainApp();
    showSuccess('Profile created successfully! 🎉');
}

function saveProfile(profile) {
    const profiles = getProfiles();
    profiles.push(profile);
    localStorage.setItem('critterTubeProfiles', JSON.stringify(profiles));
}

function getProfiles() {
    const stored = localStorage.getItem('critterTubeProfiles');
    return stored ? JSON.parse(stored) : [];
}

function loadExistingProfiles() {
    const profiles = getProfiles();
    const profilesList = document.getElementById('profiles-list');
    
    profilesList.innerHTML = '';
    
    profiles.forEach(profile => {
        const profileCard = document.createElement('div');
        profileCard.className = 'profile-card';
        profileCard.style.borderColor = profile.color;
        profileCard.onclick = () => selectProfile(profile);
        
        profileCard.innerHTML = `
            <span class="profile-emoji">${profile.emoji}</span>
            <span class="profile-name">${profile.name}</span>
        `;
        
        profilesList.appendChild(profileCard);
    });
}

function selectProfile(profile) {
    currentProfile = profile;
    updateCurrentProfile();
    showMainApp();
    showSuccess(`Welcome back, ${profile.name}! 🎉`);
}

function updateCurrentProfile() {
    const profileInfo = document.getElementById('current-profile');
    if (profileInfo && currentProfile) {
        profileInfo.innerHTML = `
            <span class="profile-emoji">${currentProfile.emoji}</span>
            <span class="profile-name">${currentProfile.name}</span>
        `;
    }
}

// Main App Functions
function showMainApp() {
    showScreen('main-app');
    loadVideos();
    startScreenTimeTracking();
}

// YouTube API Integration
function onYouTubeIframeAPIReady() {
    // Player will be initialized when a video is selected
}

function initializePlayer(videoId) {
    if (player) {
        player.destroy();
    }
    
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
            'autoplay': 1,
            'controls': 1,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'iv_load_policy': 3,
            'fs': 1,
            'cc_load_policy': 0,
            'disablekb': 0,
            'enablejsapi': 1,
            'origin': window.location.origin
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    playSound('video-start');
}

function onPlayerStateChange(event) {
    const playPauseBtn = document.getElementById('play-pause-btn');
    
    if (event.data === YT.PlayerState.PLAYING) {
        playPauseBtn.textContent = '⏸️ Pause';
    } else if (event.data === YT.PlayerState.PAUSED) {
        playPauseBtn.textContent = '▶️ Play';
    } else if (event.data === YT.PlayerState.ENDED) {
        playSound('video-end');
        setTimeout(nextVideo, 2000); // Auto-play next video after 2 seconds
    }
}

function onPlayerError(event) {
    console.error('YouTube Player Error:', event.data);
    showError('Video failed to load. Trying next video...');
    setTimeout(nextVideo, 3000);
}

// Video Functions
async function loadVideos() {
    showLoading(true);
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${currentPlaylist}&key=${YOUTUBE_API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch videos');
        }
        
        const data = await response.json();
        videos = data.items.filter(item => item.snippet.resourceId?.videoId);
        
        displayVideos();
        showLoading(false);
        
    } catch (error) {
        console.error('Error loading videos:', error);
        showError('Failed to load videos. Please try again later.');
        showLoading(false);
    }
}

function displayVideos() {
    const container = document.getElementById('videos-container');
    container.innerHTML = '';
    
    videos.forEach((video, index) => {
        const videoCard = createVideoCard(video, index);
        container.appendChild(videoCard);
    });
}

function createVideoCard(video, index) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.onclick = () => playVideo(index);
    
    const snippet = video.snippet;
    const videoId = snippet.resourceId.videoId;
    const thumbnail = snippet.thumbnails.medium || snippet.thumbnails.default;
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${thumbnail.url}" alt="${snippet.title}" loading="lazy">
            <div class="play-overlay">▶️</div>
        </div>
        <div class="video-details">
            <h3 class="video-title">${snippet.title}</h3>
            <p class="video-duration">Ready to watch!</p>
        </div>
    `;
    
    return card;
}

function playVideo(index) {
    currentVideoIndex = index;
    const video = videos[index];
    const videoId = video.snippet.resourceId.videoId;
    
    // Update video title
    document.getElementById('video-title').textContent = video.snippet.title;
    
    // Show video section
    document.getElementById('video-section').style.display = 'block';
    
    // Initialize or load video
    if (player) {
        player.loadVideoById(videoId);
    } else {
        initializePlayer(videoId);
    }
    
    // Scroll to video player
    document.getElementById('video-section').scrollIntoView({ behavior: 'smooth' });
    
    // Update mascot message
    updateMascotMessage(`Great choice! Enjoy "${video.snippet.title}"! 🎬`);
    
    playSound('video-select');
}

// Video Controls
function togglePlayPause() {
    if (player) {
        const state = player.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }
}

function previousVideo() {
    if (currentVideoIndex > 0) {
        playVideo(currentVideoIndex - 1);
    } else {
        showInfo('This is the first video! 🎬');
    }
}

function nextVideo() {
    if (currentVideoIndex < videos.length - 1) {
        playVideo(currentVideoIndex + 1);
    } else {
        showInfo('You\'ve reached the end! Starting from the beginning... 🔄');
        playVideo(0);
    }
}

function toggleFullscreen() {
    if (player && player.getIframe) {
        const iframe = player.getIframe();
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        }
    }
}

// Settings Functions
function showSettings() {
    loadSettingsValues();
    showScreen('settings-screen');
}

function hideSettings() {
    showScreen('main-app');
}

function loadSettingsValues() {
    // Load dark mode setting
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.checked = localStorage.getItem('critterTubeDarkMode') === 'true';
    
    // Load sound setting
    const soundToggle = document.getElementById('sound-toggle');
    soundToggle.checked = soundsEnabled;
    
    // Load time limit
    const timeLimitSelect = document.getElementById('time-limit-select');
    timeLimitSelect.value = timeLimit.toString();
    
    // Load playlist
    const playlistSelect = document.getElementById('playlist-select');
    playlistSelect.value = currentPlaylist;
    
    // Update time remaining display
    updateTimeRemainingDisplay();
}

function toggleDarkMode() {
    const isDarkMode = document.getElementById('dark-mode-toggle').checked;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('critterTubeDarkMode', isDarkMode.toString());
    playSound('toggle');
}

function toggleSounds() {
    soundsEnabled = document.getElementById('sound-toggle').checked;
    localStorage.setItem('critterTubeSounds', soundsEnabled.toString());
    if (soundsEnabled) {
        playSound('toggle');
    }
}

function setTimeLimit() {
    const newLimit = parseInt(document.getElementById('time-limit-select').value);
    timeLimit = newLimit;
    localStorage.setItem('critterTubeTimeLimit', timeLimit.toString());
    
    updateTimeRemainingDisplay();
    
    if (timeLimit > 0) {
        startScreenTimeTracking();
    } else {
        stopScreenTimeTracking();
    }
    
    playSound('setting-change');
}

function changePlaylist() {
    const newPlaylist = document.getElementById('playlist-select').value;
    if (newPlaylist !== currentPlaylist) {
        currentPlaylist = newPlaylist;
        localStorage.setItem('critterTubePlaylist', currentPlaylist);
        loadVideos();
        showSuccess('Playlist changed! 🎵');
    }
}

// Profile Settings
function editProfile() {
    if (currentProfile && !currentProfile.isGuest) {
        // Pre-populate form with current profile data
        document.getElementById('profile-name').value = currentProfile.name;
        
        // Select current emoji
        document.querySelectorAll('.emoji-option').forEach(option => {
            option.classList.toggle('selected', option.dataset.emoji === currentProfile.emoji);
        });
        
        // Select current color
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.toggle('selected', option.dataset.color === currentProfile.color);
        });
        
        showScreen('profile-setup');
    } else {
        showInfo('Guest profiles cannot be edited. Create a new profile to save your preferences!');
    }
}

function switchProfile() {
    showExistingProfiles();
}

function deleteProfile() {
    if (currentProfile && !currentProfile.isGuest) {
        if (confirm(`Are you sure you want to delete ${currentProfile.name}'s profile?`)) {
            const profiles = getProfiles();
            const updatedProfiles = profiles.filter(p => p.id !== currentProfile.id);
            localStorage.setItem('critterTubeProfiles', JSON.stringify(updatedProfiles));
            
            showSuccess('Profile deleted successfully!');
            showWelcome();
        }
    } else {
        showInfo('Cannot delete guest profile!');
    }
}

// Parent Lock Functions
function showParentLock() {
    generateMathProblem();
    showModal('parent-lock-modal');
}

function hideParentLock() {
    hideModal('parent-lock-modal');
}

function generateMathProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let result;
    if (operator === '+') {
        result = num1 + num2;
    } else {
        result = num1 - num2;
    }
    
    parentLockAnswer = result;
    document.getElementById('math-problem').textContent = `${num1} ${operator} ${num2} = ?`;
    document.getElementById('math-answer').value = '';
}

function checkParentAnswer() {
    const userAnswer = parseInt(document.getElementById('math-answer').value);
    
    if (userAnswer === parentLockAnswer) {
        hideParentLock();
        showSuccess('Access granted! 🔓');
        // Enable parent controls here
        enableParentControls();
    } else {
        showError('Incorrect answer. Try again!');
        generateMathProblem();
        document.getElementById('math-answer').classList.add('error-shake');
        setTimeout(() => {
            document.getElementById('math-answer').classList.remove('error-shake');
        }, 500);
    }
}

function enableParentControls() {
    // Show additional parent-only settings
    alert('Parent controls unlocked! You can now modify time limits and playlist settings.');
}

// Screen Time Management
function startScreenTimeTracking() {
    if (timeLimit > 0) {
        screenTimeStarted = Date.now();
        
        // Clear existing timer
        if (screenTimeTimer) {
            clearInterval(screenTimeTimer);
        }
        
        // Start timer
        screenTimeTimer = setInterval(checkScreenTime, 60000); // Check every minute
        updateTimeRemainingDisplay();
    }
}

function stopScreenTimeTracking() {
    if (screenTimeTimer) {
        clearInterval(screenTimeTimer);
        screenTimeTimer = null;
    }
    screenTimeStarted = null;
    updateTimeRemainingDisplay();
}

function checkScreenTime() {
    if (timeLimit > 0 && screenTimeStarted) {
        const elapsed = Math.floor((Date.now() - screenTimeStarted) / 60000); // minutes
        const remaining = timeLimit - elapsed;
        
        updateTimeRemainingDisplay();
        
        if (remaining <= 0) {
            showTimeLimitModal();
        } else if (remaining <= 5) {
            showWarning(`Only ${remaining} minutes left! ⏰`);
        }
    }
}

function updateTimeRemainingDisplay() {
    const timeRemainingDiv = document.getElementById('time-remaining');
    const timeLeftSpan = document.getElementById('time-left');
    
    if (timeLimit > 0 && screenTimeStarted) {
        const elapsed = Math.floor((Date.now() - screenTimeStarted) / 60000);
        const remaining = Math.max(0, timeLimit - elapsed);
        
        timeLeftSpan.textContent = remaining;
        timeRemainingDiv.style.display = 'block';
    } else {
        timeRemainingDiv.style.display = 'none';
    }
}

function showTimeLimitModal() {
    showModal('time-limit-modal');
    if (player) {
        player.pauseVideo();
    }
}

function extendTime() {
    screenTimeStarted = Date.now() - (timeLimit - 5) * 60000; // Give 5 more minutes
    hideModal('time-limit-modal');
    showSuccess('5 more minutes added! 🎉');
    updateTimeRemainingDisplay();
}

function takeBreak() {
    hideModal('time-limit-modal');
    showWelcome();
    stopScreenTimeTracking();
    showSuccess('Good job taking a break! Come back soon! 😴');
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}

// Sound Functions
function playSound(type) {
    if (!soundsEnabled) return;
    
    // Create audio context for different sound types
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Different frequencies for different sounds
    const sounds = {
        'click': 800,
        'success': [523, 659, 784], // C-E-G chord
        'error': [400, 300, 200],
        'transition': 600,
        'toggle': 700,
        'setting-change': 750,
        'video-select': 900,
        'video-start': 1000,
        'video-end': 500,
        'welcome': [440, 554, 659, 831], // A-C#-E-G# chord
        'mascot': 650,
        'category-select': 750,
        'voice-start': [440, 554, 659],
        'voice-success': [523, 659, 784, 1047],
        'like': [659, 784, 988],
        'share': [523, 659],
        'save': [784, 988, 1175]
    };
    
    const frequency = sounds[type] || 600;
    
    if (Array.isArray(frequency)) {
        // Play chord
        frequency.forEach((freq, index) => {
            setTimeout(() => playTone(audioContext, freq, 0.2), index * 100);
        });
    } else {
        playTone(audioContext, frequency, 0.3);
    }
}

function playTone(audioContext, frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// UI Enhancement Functions
function addSparkleEffect(element) {
    element.classList.add('sparkle');
    setTimeout(() => element.classList.remove('sparkle'), 600);
}

function showLoading(show) {
    const spinner = document.getElementById('loading-spinner');
    const container = document.getElementById('videos-container');
    
    if (show) {
        spinner.style.display = 'block';
        container.style.display = 'none';
    } else {
        spinner.style.display = 'none';
        container.style.display = 'grid';
    }
}

// Notification Functions
function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showInfo(message) {
    showNotification(message, 'info');
}

function showWarning(message) {
    showNotification(message, 'warning');
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '15px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        maxWidth: '300px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#96CEB4',
        error: '#FD79A8',
        info: '#45B7D1',
        warning: '#FFEAA7'
    };
    notification.style.background = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
    
    // Play sound
    playSound(type === 'success' ? 'success' : type === 'error' ? 'error' : 'toggle');
}

// Keyboard Navigation
function handleKeyboardNavigation(event) {
    if (currentScreen === 'main-app') {
        switch(event.key) {
            case ' ':
                event.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextVideo();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                previousVideo();
                break;
            case 'f':
            case 'F':
                event.preventDefault();
                toggleFullscreen();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
        }
    }
}

// Voice Control (Basic implementation)
function initializeVoiceControl() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = function(event) {
            const command = event.results[0][0].transcript.toLowerCase();
            handleVoiceCommand(command);
        };
        
        // Add voice control button
        const voiceBtn = document.createElement('button');
        voiceBtn.className = 'control-btn';
        voiceBtn.innerHTML = '🎤 Voice';
        voiceBtn.onclick = () => recognition.start();
        
        document.querySelector('.video-controls').appendChild(voiceBtn);
    }
}

function handleVoiceCommand(command) {
    if (command.includes('play')) {
        if (player) player.playVideo();
    } else if (command.includes('pause')) {
        if (player) player.pauseVideo();
    } else if (command.includes('next')) {
        nextVideo();
    } else if (command.includes('previous')) {
        previousVideo();
    } else if (command.includes('fullscreen')) {
        toggleFullscreen();
    }
}

// Load Settings on Start
function loadSettings() {
    // Load dark mode
    const darkMode = localStorage.getItem('critterTubeDarkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Load sounds setting
    soundsEnabled = localStorage.getItem('critterTubeSounds') !== 'false';
    
    // Load time limit
    timeLimit = parseInt(localStorage.getItem('critterTubeTimeLimit')) || 0;
    
    // Load playlist
    currentPlaylist = localStorage.getItem('critterTubePlaylist') || 'PLO2NpzUDdem0ZSJqOsKpJ7H1rikJTIX2d';
}

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Only handle horizontal swipes in video section
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (currentScreen === 'main-app' && document.getElementById('video-section').style.display !== 'none') {
            if (diffX > 0) {
                // Swipe left - next video
                nextVideo();
            } else {
                // Swipe right - previous video
                previousVideo();
            }
        }
    }
    
    touchStartX = 0;
    touchStartY = 0;
});

// Cleanup and Error Handling
window.addEventListener('beforeunload', function() {
    if (screenTimeTimer) {
        clearInterval(screenTimeTimer);
    }
});

window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    showError('Something went wrong. Please refresh the page.');
});

// Initialize voice control when player is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeVoiceControl, 2000);
});

console.log('🎬 CritterTube loaded successfully! Welcome to safe video fun! 🐶🐱🐼');
