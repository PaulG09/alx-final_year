document.addEventListener("DOMContentLoaded", function () {
  // Handle logout click
  const logoutLink = document.getElementById("logout-link");

  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default behavior of the link

      fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "same-origin", // Ensure cookies/session are sent
      })
        .then((response) => {
          if (response.ok) {
            // Redirect to the root page after successful logout
            window.location.href = "/";
          } else {
            alert("Failed to log out. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Logout error:", error);
          alert("An error occurred while logging out.");
        });
    });
  }
});
