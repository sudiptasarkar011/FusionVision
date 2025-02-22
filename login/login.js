document.addEventListener("DOMContentLoaded", function () {
  console.log("hello");

  const form1 = document.getElementById("signin-form");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  console.log(form1);

  form1.addEventListener("submit", async function (event) {
      event.preventDefault(); // Ensure this is called at the start to prevent page reload
      console.log("Form submission prevented");

      let valid = true;
      console.log(valid);

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
          console.log("Form invalid");
          return; // Exit the function early if validation fails
      }

      // Send login POST request
      try {
          console.log("Sending POST request...");
          const response = await axios.post('http://localhost:5000/login', {
              email: email.value,
              password: password.value
          });
          console.log(response.data);

          if (response.data.token) {
              // Store the JWT in localStorage
              localStorage.setItem('jwt', response.data.token);
              alert('Login successful!');
              window.location.href = '/FusionVision/index.html?'; // Redirect to /index.html (root)
          } else {
              alert('Invalid email or password');
          }
      } catch (error) {
          console.error('Error during login:', error);
          alert('Login failed. Please try again.');
      }
  });

  function showError(input, message) {
      // Select the error element next to the input field
      const errorElement = input.nextElementSibling;
      if (errorElement && errorElement.classList.contains('error-message')) {
          input.style.borderColor = "#e74c3c"; // Red border for the input
          errorElement.textContent = message; // Set error message
          errorElement.style.display = "block"; // Display the error message
      }
  }

  function hideError(input) {
      // Select the error element next to the input field
      const errorElement = input.nextElementSibling;
      if (errorElement && errorElement.classList.contains('error-message')) {
          input.style.borderColor = "#ccc"; // Reset input border color
          errorElement.style.display = "none"; // Hide the error message
      }
  }
});
