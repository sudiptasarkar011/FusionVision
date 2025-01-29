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

// signin page
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signin-form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  form.addEventListener("submit", function (event) {
      let valid = true;

      // Email validation
      if (!email.value.includes("@") || !email.value.includes(".")) {
          showError(email, "Invalid email");
          valid = false;
      } else {
          hideError(email);
      }

      // Password validation
      if (password.value.length < 6) {
          showError(password, "Password must be at least 6 characters");
          valid = false;
      } else {
          hideError(password);
      }

      if (!valid) {
          event.preventDefault();
      }
  });

  function showError(input, message) {
      const errorElement = input.nextElementSibling.nextElementSibling;
      input.style.borderColor = "#e74c3c";
      errorElement.textContent = message;
      errorElement.style.display = "block";
  }

  function hideError(input) {
      const errorElement = input.nextElementSibling.nextElementSibling;
      input.style.borderColor = "#ccc";
      errorElement.style.display = "none";
  }
});


// signup page
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const confirmPassword = document.getElementById("confirm-password");

      let valid = true;

      // Name Validation
      if (name.value.trim() === "") {
          showError(name, "Name is required");
          valid = false;
      } else {
          hideError(name);
      }

      // Email Validation
      if (!email.value.includes("@")) {
          showError(email, "Invalid email");
          valid = false;
      } else {
          hideError(email);
      }

      // Password Validation
      if (password.value.length < 6) {
          showError(password, "Password must be at least 6 characters");
          valid = false;
      } else {
          hideError(password);
      }

      // Confirm Password Validation
      if (confirmPassword.value !== password.value) {
          showError(confirmPassword, "Passwords do not match");
          valid = false;
      } else {
          hideError(confirmPassword);
      }

      if (valid) {
          alert("Signup Successful!");
          window.location.href = "index.html"; // Redirect to sign-in page
      }
  });

  function showError(input, message) {
      const errorMsg = input.nextElementSibling;
      errorMsg.textContent = message;
      errorMsg.style.display = "block";
      input.style.borderColor = "#e74c3c";
  }

  function hideError(input) {
      const errorMsg = input.nextElementSibling;
      errorMsg.style.display = "none";
      input.style.borderColor = "#ccc";
  }
});
