const slides = document.querySelectorAll(".carousel-slide");
const prevButton = document.querySelector(".carousel-control-prev");
const nextButton = document.querySelector(".carousel-control-next");

let currentIndex = 0;

function updateSlide() {
    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentIndex);
    });
}

prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
});

nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
});

// Initialize the first slide
updateSlide();







