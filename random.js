const width = window.innerWidth;
const p = document.querySelector("p");
const gradientInfo = document.querySelector(".gradient-info");
const goback = document.querySelector(".goback");

const styleEl = document.documentElement.style;
const setStyle = styleEl.setProperty.bind(styleEl);

document.addEventListener("click", (e) => {
  // Check if the clicked element is the copiable gradientInfo or not first, bec if so, dont do anything, just copoy
  if (e.target.classList.contains("gradient-info")) {
    return; // stop regenerating if the user copies (makes sense)
  }

  const gradStart = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
  const gradEnd = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;

  const gobackbg = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)})`;
  const gobacktext = `rgb(${Math.floor(
    Math.random() * 100
  )}, ${Math.floor(Math.random() * 100)}, ${Math.floor(
    Math.random() * 100
  )})`;
  goback.style.background = gobackbg;
  goback.style.fill = gobacktext;

  setStyle("--grad-start", gradStart);
  setStyle("--grad-end", gradEnd);
  gradientInfo.innerHTML = `${gradStart} | ${gradEnd}`;
});

//copying the gradientcolors
gradientInfo.addEventListener("click", () => {
  navigator.clipboard
    .writeText(gradientInfo.textContent)
    .then(() => {
      alert("Gradient info copied to clipboard!");
    })
    .catch((err) => {
      console.error("Unable to copy:", err);
    });
});