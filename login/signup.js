document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    console.log(form);

    form.addEventListener("submit", async function (event) {
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
            // Send POST request to register
            try {
                const response = await axios.post('http://localhost:5000/register', {
                    name: name.value,
                    email: email.value,
                    password: password.value
                });

                console.log(response); // Log response to check what it contains

                if (response.data ) {
                    // Store the JWT in localStorage
                    localStorage.setItem('jwt', response.data.token);
                    alert("Signup Successful!");
                    window.location.href = "signin.html"; // Redirect to sign-in page
                } else {
                    alert('Signup failed. Please try again.'); // This happens if the token is not found in the response
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('Signup failed. Please try again.');
            }
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
