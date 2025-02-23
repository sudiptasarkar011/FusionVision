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

// Stop the camera
function stopCamera() {
    if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach((track) => track.stop());
        alert("Camera stopped!");
        window.location.href = "index.html"; // Redirect back to the homepage
    }
}