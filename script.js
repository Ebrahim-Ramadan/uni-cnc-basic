const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const gradientType = document.getElementById("gradient-type");
const direction = document.getElementById("direction");
const gradientBox= document.getElementById("gradient-box");
const range1 = document.getElementById("range1");
const range2 = document.getElementById("range2");
const copySVG = document.getElementById("copySVG");
const copyCSS = document.getElementById("copyCSS");
const output = document.getElementById("output");
let content 

range1.addEventListener("input", () => {
  if (parseInt(range1.value) >= parseInt(range2.value)) {
    range1.value = parseInt(range2.value) - 1; //minus
  }
  setGradient()
  console.log("range1.value = ", range1.value);
});

range2.addEventListener("input", () => {
  if (parseInt(range2.value) <= parseInt(range1.value)) {
    range2.value = parseInt(range1.value) + 1; //plus
  }
  setGradient()
  console.log("range2.value = ", range2.value);
});
function setGradient() {
  generateSVG()
  if (gradientType.value === "linear") {
    gradientBox.style.background = `linear-gradient(to ${direction.value}, ${color1.value} ${range1.value}%, ${color2.value} ${range2.value}%)`;
  } else if (gradientType.value === "radial") {
    gradientBox.style.background = `radial-gradient(${color1.value}, ${color2.value})`;
  }
}

gradientType.addEventListener("change", setGradient);
color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
direction.addEventListener("change", setGradient);
range1.addEventListener("change", setGradient);
range2.addEventListener("change", setGradient);

// Initial gradient setting for both
setGradient();
generateSVG();

// Function to generate SVG with gradient
function generateSVG() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "200");
  svg.setAttribute("height", "100");

  const rect = document.createElementNS(svgNS, "rect");
  rect.setAttribute("x", "10");
  rect.setAttribute("y", "10");
  rect.setAttribute("width", "180");
  rect.setAttribute("height", "80");

  if (gradientType.value === "linear") {
    const gradient = document.createElementNS(svgNS, "linearGradient");
    gradient.setAttribute("id", "svgGradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "100%");

    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", range1.value + "%");
    stop1.setAttribute("stop-color", color1.value);

    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", range2.value + "%");
    stop2.setAttribute("stop-color", color2.value);

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);

    rect.setAttribute("fill", "url(#svgGradient)");
    svg.appendChild(gradient);
  } else if (gradientType.value === "radial") {
    rect.setAttribute("fill", `radial-gradient(${color1.value}, ${color2.value})`);
  }

  svg.appendChild(rect);
  content = svg.outerHTML 
  output.textContent = svg.outerHTML
  
}


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


const copyfunc = (elementToCopy, what) => {
  return () => {
    navigator.clipboard
      .writeText(elementToCopy)
      .then(() => {
        console.log('ass');
        if (what === 'css') {
          output.textContent = gradientBox.outerHTML          
        }
        else if (what === 'svg') {
          output.textContent = content         
        }
        Toastify({

          text: "copied!",
          gravity: "top", // `top` or `bottom`
          position: "center",
          duration: 1000,
          style: {
            background: gradientBox.style.background,
          }
          }).showToast();
      })
      .catch((err) => {
        console.error("Unable to copy:", err);
      });
  };
};
copyCSS.addEventListener("click", copyfunc(gradientBox.outerHTML, 'css'));
copySVG.addEventListener("click", copyfunc(output.textContent, 'svg'));