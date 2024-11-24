var currentUser = null;
var userImages = {};
// Function to handle user login
function handleLogin(username, password) {
    // In a real app, validate against backend
    // For demo, just store username
    currentUser = username;
    // Load user's saved images from localStorage
    var savedData = localStorage.getItem(username);
    if (savedData) {
        userImages[username] = JSON.parse(savedData);
    }
    else {
        userImages[username] = [];
    }
    // Update welcome message
    updateWelcomeMessage();
}
// Function to handle user registration 
function handleRegistration(username, password) {
    // In a real app, store in backend
    // For demo, just initialize storage
    currentUser = username;
    userImages[username] = [];
    localStorage.setItem(username, JSON.stringify([]));
    updateWelcomeMessage();
}
// Function to update welcome message
function updateWelcomeMessage() {
    var welcomeDiv = document.createElement('div');
    welcomeDiv.id = 'welcome-message';
    welcomeDiv.style.color = 'white';
    welcomeDiv.style.padding = '10px';
    welcomeDiv.style.textAlign = 'center';
    welcomeDiv.innerHTML = "Welcome, ".concat(currentUser, "!");
    // Insert at top of main content
    var mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.prepend(welcomeDiv);
    }
}
// Modified captureImage function to save images
function captureImage() {
    if (!currentUser) {
        alert('Please log in first!');
        return;
    }
    var canvas = document.getElementById("capturedCanvas");
    if (!canvas)
        return;
    var context = canvas.getContext("2d");
    if (!context)
        return;
    var video = document.getElementById("cameraPreview");
    if (!video)
        return;
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Save image data
    var imageData = canvas.toDataURL('image/jpeg');
    if (currentUser && userImages[currentUser]) {
        userImages[currentUser].push({
            timestamp: new Date().toISOString(),
            data: imageData
        });
        // Save to localStorage
        localStorage.setItem(currentUser, JSON.stringify(userImages[currentUser]));
    }
}
// Function to handle logout
function handleLogout() {
    if (currentUser) {
        // Save any pending data
        localStorage.setItem(currentUser, JSON.stringify(userImages[currentUser]));
        currentUser = null;
        // Remove welcome message
        var welcomeMsg = document.getElementById('welcome-message');
        if (welcomeMsg) {
            welcomeMsg.remove();
        }
        // Redirect to login page
        window.location.href = 'index.html';
    }
}
// Function to display user's saved images
function displaySavedImages() {
    if (!currentUser || !userImages[currentUser])
        return;
    var images = userImages[currentUser];
    var container = document.createElement('div');
    container.className = 'saved-images';
    images.forEach(function (img) {
        var imgElement = document.createElement('img');
        imgElement.src = img.data;
        imgElement.style.maxWidth = '200px';
        imgElement.style.margin = '10px';
        container.appendChild(imgElement);
    });
    var mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.appendChild(container);
    }
}
