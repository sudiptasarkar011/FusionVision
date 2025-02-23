# Fusion Vision

A real-time object detection system with voice narration capabilities. The aim is to create a Social Media Platform for the visually impaired where they can upload their photos and get the description of the image in voice. Also they can share their photos with their friends and family and checkout the photos from others and know the updates of their surroundings.


## Features

- Real-Time Object Detection: Utilizes Coco-SSD (TensorFlow.js) for live object detection.
- Voice narration of detected objects
- Web-based interface for easy access
- Unique Social Media Platform for the visually impaired
- Unique profiles and verified users


## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (for web dependencies)
- **MongoDB**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/fusion-vision.git
   cd fusion-vision
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up the Database**

- Ensure MongoDB is running locally or configure a remote MongoDB instance.
- Create `.env` file with the following content:

  ```bash
  MONGODB_URI=mongodb://localhost:27017/camera-app
  PORT=5000
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=your_password_here
  DB_NAME=fusion_vision
  ```

4. **Start the Server**:

```bash
node server.js
```

5. **Launch the web interface:**

   Open `index.html` in a modern web browser.

### Dependencies

#### Core Requirements

- **TensorFlow** (>=2.0.0)
  - Deep learning framework for object detection.
  - Used for running the COCO-SSD model.


#### Web Technologies

- **HTML5**
  - Camera API
  - Canvas for drawing
  - Speech synthesis

- **JavaScript**
  - TensorFlow.js
  - WebRTC for camera access
  - Speech synthesis API

#### Browser Requirements

- Modern web browser with:
  - WebRTC support
  - JavaScript enabled
  - Web Speech API support

---
### Accessibility Permissions

To ensure the application functions correctly, you need to grant the following permissions in your web browser:

- **Camera Access**: Required for capturing images and performing real-time object detection.
- **Microphone Access**: Needed if the application includes voice input features.
- **Speech Synthesis**: Ensure your browser allows speech synthesis for voice narration of detected objects.

## Screenshots

Here are some screenshots of the application:

- **Contact Page**
  
  ![Contact Page](/images/contact.jpg)

- **Homepage**

  ![Homepage](/images/homepage.jpg)

- **Permission Request**

  ![Permission Request](/images/permission.jpg)



## Open Source Programs featuring Fusion Vision

- **Social Winter Of Code 2025**

  ![SWOC](/images/swoc.png)

- **InnoGeeks Winter of Code**

  ![IWOC](/images/iwoc.png)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.



