const input = document.getElementById("input-range");
const arrow = document.querySelector(".arrow");
const hearts = document.querySelectorAll(".heart");
const tip = document.querySelector(".tip");

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
});
