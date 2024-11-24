// User session management
interface UserImage {
    timestamp: string;
    data: string;
}

interface UserImagesMap {
    [username: string]: UserImage[];
}

let currentUser: string | null = null;
let userImages: UserImagesMap = {};

// Function to handle user login
function handleLogin(username: string, password: string): void {
    // In a real app, validate against backend
    // For demo, just store username
    currentUser = username;
    
    // Load user's saved images from localStorage
    const savedData = localStorage.getItem(username);
    if (savedData) {
        userImages[username] = JSON.parse(savedData);
    } else {
        userImages[username] = [];
    }

    // Update welcome message
    updateWelcomeMessage();
}

// Function to handle user registration 
function handleRegistration(username: string, password: string): void {
    // In a real app, store in backend
    // For demo, just initialize storage
    currentUser = username;
    userImages[username] = [];
    localStorage.setItem(username, JSON.stringify([]));
    
    updateWelcomeMessage();
}

// Function to update welcome message
function updateWelcomeMessage(): void {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.id = 'welcome-message';
    welcomeDiv.style.color = 'white';
    welcomeDiv.style.padding = '10px';
    welcomeDiv.style.textAlign = 'center';
    welcomeDiv.innerHTML = `Welcome, ${currentUser}!`;
    
    // Insert at top of main content
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.prepend(welcomeDiv);
    }
}

// Modified captureImage function to save images
function captureImage(): void {
    if (!currentUser) {
        alert('Please log in first!');
        return;
    }

    const canvas = document.getElementById("capturedCanvas") as HTMLCanvasElement;
    if (!canvas) return;
    
    const context = canvas.getContext("2d");
    if (!context) return;
    
    const video = document.getElementById("cameraPreview") as HTMLVideoElement;
    if (!video) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Save image data
    const imageData = canvas.toDataURL('image/jpeg');
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
function handleLogout(): void {
    if (currentUser) {
        // Save any pending data
        localStorage.setItem(currentUser, JSON.stringify(userImages[currentUser]));
        currentUser = null;
        
        // Remove welcome message
        const welcomeMsg = document.getElementById('welcome-message');
        if (welcomeMsg) {
            welcomeMsg.remove();
        }
        
        // Redirect to login page
        window.location.href = 'index.html';
    }
}

// Function to display user's saved images
function displaySavedImages(): void {
    if (!currentUser || !userImages[currentUser]) return;
    
    const images = userImages[currentUser];
    const container = document.createElement('div');
    container.className = 'saved-images';
    
    images.forEach((img: UserImage) => {
        const imgElement = document.createElement('img');
        imgElement.src = img.data;
        imgElement.style.maxWidth = '200px';
        imgElement.style.margin = '10px';
        container.appendChild(imgElement);
    });

    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.appendChild(container);
    }
}

