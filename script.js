const input = document.getElementById("input-range");
const arrow = document.querySelector(".arrow");
const hearts = document.querySelectorAll(".heart");
const metric = document.querySelector(".metric");

// Функция для создания анимации тряски с заданной амплитудой
function createShakeAnimation(amplitude) {
  const styleSheet = document.styleSheets[0];
  const animationName = `shake-${Math.floor(amplitude)}-${Date.now()}`; // Уникальное имя с временной меткой

  // Удаляем старую анимацию
  for (let i = 0; i < styleSheet.cssRules.length; i++) {
    if (
      styleSheet.cssRules[i].name &&
      styleSheet.cssRules[i].name.startsWith("shake-")
    ) {
      styleSheet.deleteRule(i);
      break;
    }
  }

  // Фиксированные значения для анимации
  const x1 = -amplitude; // Смещение влево
  const y1 = amplitude / 2; // Легкое смещение вверх
  const rotate1 = -1; // Небольшой поворот влево
  const x2 = amplitude; // Смещение вправо
  const y2 = -amplitude / 2; // Легкое смещение вниз
  const rotate2 = 1; // Небольшой поворот вправо
  const x3 = -amplitude / 2; // Уменьшенное смещение влево
  const y3 = amplitude / 4; // Уменьшенное смещение вверх
  const rotate3 = -0.5; // Уменьшенный поворот

  // Создаем новую анимацию с бесконечным повторением
  const keyframes = `
    @keyframes ${animationName} {
      0% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(${x1}px, ${y1}px) rotate(${rotate1}deg); }
      50% { transform: translate(${x2}px, ${y2}px) rotate(${rotate2}deg); }
      75% { transform: translate(${x3}px, ${y3}px) rotate(${rotate3}deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }
  `;
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  return animationName;
}

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

    const animationName = createShakeAnimation(amplitude);

    // Применяем бесконечную анимацию с динамической длительностью и амплитудой
    metric.style.animation = `${animationName} ${duration}s ease-in-out infinite`;
  } else {
    // Если сердец нет, останавливаем анимацию
    metric.style.animation = "";
  }
});
