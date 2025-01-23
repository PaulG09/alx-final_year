document.addEventListener("DOMContentLoaded", function () {
  // Ensure "Education" link is active and not clickable
  const educationLink = document.querySelector(".nav-item .nav-link.selected");

  if (educationLink) {
    educationLink.classList.add("active");
    educationLink.style.pointerEvents = "none"; // Disable click
  }
});
