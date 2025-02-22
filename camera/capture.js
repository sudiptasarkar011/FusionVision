let videoStream = null;

// Start the camera preview
navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
        videoStream = stream;
        const videoElement = document.getElementById("cameraPreview");
        videoElement.srcObject = stream;
    })
    .catch((error) => {
        alert("Unable to access the camera. Please check your device settings.");
        console.error("Camera Error:", error);
    });

// Capture image from the video feed
function captureImage() {
    const videoElement = document.getElementById("cameraPreview");
    const canvas = document.getElementById("capturedCanvas");
    const imageElement = document.getElementById("capturedImage");

    // Set canvas size to match the video feed
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw the video frame onto the canvas
    const context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Convert canvas content to a data URL
    const imageData = canvas.toDataURL("image/png");

    // Display the captured image
    imageElement.src = imageData;
    imageElement.style.display = "block";

    alert("Image captured! Click 'Scan Image' to process.");
}

// Process the captured image
function processCapturedImage() {
    const imageElement = document.getElementById("capturedImage");

    if (!imageElement.src) {
        alert("Please capture an image first!");
        return;
    }

    // Send the captured image data for further processing
    // Replace this part with actual object detection logic (e.g., via a backend or TensorFlow.js)
    alert("Processing the captured image for object detection...");
    console.log("Captured Image Data URL:", imageElement.src);

    // Add your object detection code here (e.g., TensorFlow.js or an API call)
}

// Stop the camera
function stopCamera() {
    if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach((track) => track.stop());
        alert("Camera stopped!");
        window.location.href = "index.html"; // Redirect back to the homepage
    }
}