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