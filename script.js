const input = document.getElementById("input-range");
const arrow = document.querySelector(".arrow");
const hearts = document.querySelectorAll(".heart");
const tip = document.querySelector(".tip");

let heartCount = 0;
const updateHeartCounter = () => {
  heartCount = document.querySelectorAll(".heart.filled").length;
  switch (heartCount) {
    case 1:
      tip.textContent = "Хорошо";
      break;
    case 2:
      tip.textContent = "Продолжай";
      break;
    case 3:
      tip.textContent = "Почти готово..";
      break;
    case 4:
      tip.textContent = "Я люблю ❤️ тебя!";
      break;
    case 5:
      tip.innerHTML = `Идем <a href="./slidePage/sliderPage.html" class="next-link">дальше? <span></span><span></span><span></span></a>`;
      break;
    default:
      tip.textContent = "Увеличивай медленно";
      break;
  }
};

input.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  const adjustedAngle = value - 90;

  arrow.style.transform = `translateX(50%) rotate(${adjustedAngle}deg)`;

  hearts.forEach((heart) => {
    const heartAngle = parseInt(heart.getAttribute("data-angle"));
    const isFilled = adjustedAngle >= heartAngle;

    if (isFilled) {
      heart.classList.add("filled");
    } else {
      heart.classList.remove("filled");
    }
  });
  updateHeartCounter();
});

updateHeartCounter();
