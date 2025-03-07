// slider.js
const container = document.querySelector(".container");
const slidesContainer = document.querySelector(".slides-container");

// Список ваших изображений (укажите свои пути и имена файлов)
const imageFiles = [
  "images/photo_1_2025-03-08_00-03-33.jpg",
  "images/photo_15_2025-03-08_00-03-33.jpg",
  "images/photo_2_2025-03-08_00-03-33.jpg",
  "images/photo_3_2025-03-08_00-03-33.jpg",
  "images/photo_4_2025-03-08_00-03-33.jpg",
  "images/photo_5_2025-03-08_00-03-33.jpg",
  "images/photo_6_2025-03-08_00-03-33.jpg",
  "images/photo_7_2025-03-08_00-03-33.jpg",
  "images/photo_8_2025-03-08_00-03-33.jpg",
  "images/photo_9_2025-03-08_00-03-33.jpg",
  "images/photo_10_2025-03-08_00-03-33.jpg",
  "images/photo_11_2025-03-08_00-03-33.jpg",
  "images/photo_12_2025-03-08_00-03-33.jpg",
  "images/photo_13_2025-03-08_00-03-33.jpg",
  "images/photo_14_2025-03-08_00-03-33.jpg",
  "images/photo_16_2025-03-08_00-03-33.jpg",
  "images/photo_17_2025-03-08_00-03-33.jpg",
  "images/photo_18_2025-03-08_00-03-33.jpg",
  "images/photo_2025-03-07_20-18-17.jpg",
];

// Функция для создания сердечка
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = `${Math.random() * 100}%`;
  const size = Math.random() * 20 + 20;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  const duration = Math.random() * 3 + 3;
  heart.style.animationDuration = `${duration}s`;
  heart.style.animationDelay = `${Math.random() * 2}s`;
  heart.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  `;
  container.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

setInterval(createHeart, 250);
for (let i = 0; i < 10; i++) createHeart();

// Добавление слайдов из списка файлов
imageFiles.forEach((filePath) => {
  const slide = document.createElement("div");
  slide.classList.add("slide");
  const img = document.createElement("img");
  img.src = filePath;
  slide.appendChild(img);
  slidesContainer.appendChild(slide);
});

// Логика свайп-слайдера
let slides = document.querySelectorAll(".slide");
let currentIndex = 0;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let isDragging = false;

function updateSlides(translate = 0) {
  slides.forEach((slide, index) => {
    const offset = index - currentIndex;
    slide.style.transform = `translateX(${offset * 30 + translate}%) scale(${
      1 - Math.abs(offset + translate / 30) * 0.15
    })`;
    // slide.style.opacity = `${1 - Math.abs(offset + translate / 30) * 0.3}`;
    slide.style.zIndex = slides.length - Math.abs(offset);
    if (offset === 0) {
      slide.style.filter = "blur(0px) grayscale(0)"; // Активный слайд четкий
    } else {
      slide.style.filter = `blur(${Math.abs(offset) * 4}px) grayscale(100%)`; // Неактивные слайды размыты
    }
  });
}

function setPositionByIndex() {
  currentTranslate = 0;
  prevTranslate = 0;
  updateSlides();
}

const slider = document.querySelector(".slider");
slider.addEventListener("mousedown", startDrag);
slider.addEventListener("touchstart", startDrag);
slider.addEventListener("mousemove", drag);
slider.addEventListener("touchmove", drag);
slider.addEventListener("mouseup", endDrag);
slider.addEventListener("mouseleave", endDrag);
slider.addEventListener("touchend", endDrag);

function startDrag(e) {
  isDragging = true;
  startPos = getPositionX(e);
  animationID = requestAnimationFrame(animation);
  slidesContainer.style.transition = "none";
}

function drag(e) {
  if (isDragging) {
    const currentPosition = getPositionX(e);
    currentTranslate =
      prevTranslate + ((currentPosition - startPos) / slider.offsetWidth) * 100;
    updateSlides(currentTranslate);
  }
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  cancelAnimationFrame(animationID);
  slidesContainer.style.transition = "transform 0.5s ease";
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -10 && currentIndex < slides.length - 1) {
    currentIndex += 1;
  } else if (movedBy > 10 && currentIndex > 0) {
    currentIndex -= 1;
  }

  prevTranslate = 0;
  currentTranslate = 0;
  setPositionByIndex();
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
}

function animation() {
  if (isDragging) requestAnimationFrame(animation);
}

// Инициализация слайдера
setPositionByIndex();
