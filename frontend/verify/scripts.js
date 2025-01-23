// Toggle password visibility
function togglePasswordVisibility() {
  const password = document.getElementById("password");
  const icon = document.getElementById("togglePassword");

  // Toggle password visibility
  if (password.type === "password") {
    password.type = "text"; // Show password
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    password.type = "password"; // Hide password
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

// Handle form submission
document
  .getElementById("signupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Gather form data
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const signupButton = e.target.querySelector("button[type='submit']");

    // Basic form validation (Optional)
    if (!fullName || !email || !username || !password) {
      alert("All fields are required. Please fill in all fields.");
      return;
    }

    // Disable the signup button to indicate processing
    signupButton.disabled = true;
    signupButton.textContent = "Processing...";

    try {
      // Send signup request to the backend API
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, username, password }),
      });

      // Parse the JSON response
      const data = await response.json();

      if (response.ok) {
        // Redirect to the verification page on successful signup
        window.location.href = "../verify/";
      } else {
        // Handle errors returned from the server
        signupButton.disabled = false;
        signupButton.textContent = "Sign Up";
        alert(`Error: ${data.error || "Signup failed. Please try again."}`);
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Error:", error);
      signupButton.disabled = false;
      signupButton.textContent = "Sign Up";
      alert("An error occurred. Please check your network and try again.");
    }
  });
