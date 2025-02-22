let videoStream = null;
let model = null;

// Load the COCO-SSD model
cocoSsd.load().then((loadedModel) => {
    model = loadedModel;
    console.log("COCO-SSD model loaded successfully!");
}).catch((error) => {
    console.error("Error loading the COCO-SSD model:", error);
});

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

    // Set canvas size to match the video feed
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw the video frame onto the canvas
    const context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    alert("Image captured! Click 'Scan Image' to detect objects.");
}

// Process the captured image for object detection
function processCapturedImage() {
    if (!model) {
        alert("Model is not loaded yet. Please wait.");
        return;
    }

    const canvas = document.getElementById("capturedCanvas");
    const context = canvas.getContext("2d");

    // Get image data from the canvas
    const imageData = tf.browser.fromPixels(canvas);

    // Run object detection
    model.detect(imageData).then((predictions) => {
        console.log("Predictions:", predictions);
        displayPredictions(predictions, context);
        imageData.dispose(); // Clean up memory
    }).catch((error) => {
        console.error("Error during object detection:", error);
    });
}

// Display object detection predictions
function displayPredictions(predictions, context) {
    predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction.bbox;

        // Draw bounding box
        context.strokeStyle = "#00FF00";
        context.lineWidth = 2;
        context.strokeRect(x, y, width, height);

        // Draw label
        context.font = "16px Arial";
        context.fillStyle = "#00FF00";
        context.fillText(
            `${prediction.class} (${(prediction.score * 100).toFixed(1)}%)`,
            x,
            y > 10 ? y - 5 : y + 15
        );
    });

    alert("Object detection complete!");
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