const input = document.getElementById("input-range");
const arrow = document.querySelector(".arrow");
const hearts = document.querySelectorAll(".heart");
const metric = document.querySelector(".metric");

input.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  const adjustedAngle = value - 90;

  arrow.style.transform = `translateX(50%) rotate(${adjustedAngle}deg)`;

  let filledCount = 0;
  hearts.forEach((heart) => {
    const heartAngle = parseInt(heart.getAttribute("data-angle"));
    const isFilled = adjustedAngle >= heartAngle;

    if (isFilled) {
      heart.classList.add("filled");
      filledCount++;
    } else {
      heart.classList.remove("filled");
    }
  });

  // Если есть заполненные сердца, запускаем или обновляем анимацию
  if (filledCount > 0) {
    // Линейная интерполяция длительности: от 0.9s (1 сердце) до 0.5s (5 сердец)
    const duration = 0.9 - (filledCount - 1) * (0.4 / 4); // 0.4 - разница между 0.9 и 0.5, 4 - шаги между 1 и 5

    // Линейная интерполяция амплитуды: от 1px (1 сердце) до 8px (5 сердец)
    const amplitude = 1 + (filledCount - 1) * (7 / 4); // 7 - разница между 1 и 8, 4 - шаги между 1 и 5

    // Устанавливаем CSS-переменную --amplitude
    metric.style.setProperty("--amplitude", `${amplitude}px`);

    // Применяем анимацию с динамической длительностью
    metric.style.animation = `shake ${duration}s ease-in-out infinite`;
    metric.style.webkitAnimation = `shake ${duration}s ease-in-out infinite`; // Для совместимости
  } else {
    // Если сердец нет, останавливаем анимацию
    metric.style.animation = "";
    metric.style.webkitAnimation = "";
  }
});
  