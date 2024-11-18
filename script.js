// script.js

function requestPermissions() {
    // Ask for camera permission
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
            alert("Camera access granted!");
            // You can add logic here to navigate to the scanning page
        })
        .catch((error) => {
            alert("Camera access denied! Please enable it to use the scanner.");
            console.error("Camera Permission Error:", error);
        });

    // Check if the file picker API is supported for gallery access
    if (window.showOpenFilePicker) {
        alert("Gallery access is available through the file picker.");
        // Optionally, you can open a file picker dialog here
    } else {
        alert("Gallery access might not be supported on this device.");
    }
}