document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const usernameField = document.querySelector('input[type="text"]');
  const passwordField = document.querySelector('input[type="password"]');
  const errorMessageDiv = document.createElement("div");
  errorMessageDiv.style.color = "red";
  loginForm.appendChild(errorMessageDiv);

  const passwordToggleIcon = document.querySelector(".fas");

  // Toggle password visibility function
  function togglePasswordVisibility() {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      passwordToggleIcon.classList.remove("fa-eye");
      passwordToggleIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      passwordToggleIcon.classList.remove("fa-eye-slash");
      passwordToggleIcon.classList.add("fa-eye");
    }
  }

  // Add event listener for password visibility toggle
  passwordToggleIcon.addEventListener("click", togglePasswordVisibility);

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = usernameField.value;
    const password = passwordField.value;

    // Reset error message
    errorMessageDiv.textContent = "";

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If backend handles the redirect, it will respond with a redirect header (3xx status)
        window.location.href = data.redirectUrl || "/dashboard"; // Fallback to dashboard if no redirectUrl provided
      } else {
        // Display error message from server
        errorMessageDiv.textContent = data.error;
      }
    } catch (error) {
      errorMessageDiv.textContent =
        "An error occurred. Please try again later.";
      console.error("Error during login:", error);
    }
  });
});
