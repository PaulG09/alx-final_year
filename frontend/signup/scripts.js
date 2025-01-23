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
    e.preventDefault();

    // Gather form data
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Debug: Form submission attempt
    console.log("Form has been submitted.");
    console.log("Form data:", { fullName, email, username, password });

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, username, password }),
      });

      const data = await response.json();

      // Debug: Form data received by backend
      console.log("Form has been received by the server.");
      console.log("Server response:", data);

      if (response.ok) {
        alert("Signup successful!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
