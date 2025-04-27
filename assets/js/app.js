document.addEventListener("DOMContentLoaded", function () {
    // Simulate loading time (e.g., 3 seconds)
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.querySelector(".content").style.display = "block";
    }, 3000); // Adjust time as needed
});
