// Redirect to the camera preview page
function goToCameraPage() {
    window.location.href = "camera.html";
}

// Select the scroll-to-top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Function to toggle the visibility of the button
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Function to scroll to the top
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
const toggleButton = document.getElementById("darkModeToggle");
const body = document.body;

// Apply dark mode if saved in localStorage
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (toggleButton) {
        toggleButton.textContent = "☀️ Light Mode";
    }
}

// Toggle Dark Mode
if (toggleButton) {
    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            toggleButton.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            toggleButton.textContent = "🌙 Dark Mode";
        }
    });
}