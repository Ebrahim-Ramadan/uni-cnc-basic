const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const gradientType = document.getElementById("gradient-type");
const direction = document.getElementById("direction");
const gradientBox = document.getElementById("gradient-box");

function setGradient() {
  if (gradientType.value === "linear") {
    gradientBox.style.background = `linear-gradient(to ${direction.value}, ${color1.value}, ${color2.value})`;
  } else if (gradientType.value === "radial") {
    gradientBox.style.background = `radial-gradient(${color1.value}, ${color2.value})`;
  }
}

gradientType.addEventListener("change", setGradient);
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
direction.addEventListener("change", setGradient);

// Initial gradient setting
setGradient();

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formFieldIds = ["name", "email", "subject", "message"];
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };
    console.log("Form Data:", formData);

    formFieldIds.forEach((fieldId) => {
      document.getElementById(fieldId).value = "";
    });
  });

const copy = document.getElementById("copy-btn");

//copying the gradientcolors
const copyfunc = () => {
  navigator.clipboard
    .writeText(gradientBox.style.background)
    .then(() => {
      alert("Gradient info copied to clipboard!");
    })
    .catch((err) => {
      console.error("Unable to copy:", err);
    });
};
copy.addEventListener("click", copyfunc);
gradientBox.addEventListener("click", copyfunc);