const input = document.getElementById("input-range");
const arrow = document.querySelector(".arrow");
const hearts = document.querySelectorAll(".heart");

input.addEventListener("input", (e) => {
  const value = parseInt(e.target.value);
  const adjustedAngle = value - 90;

  arrow.style.transform = `translateX(50%) rotate(${adjustedAngle}deg)`;

  hearts.forEach((heart) => {
    const heartAngle = parseInt(heart.getAttribute("data-angle"));
    if (adjustedAngle >= heartAngle) {
      heart.classList.add("filled");
    } else {
      heart.classList.remove("filled");
    }
  });
});
