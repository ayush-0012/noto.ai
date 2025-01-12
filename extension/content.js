console.log("Note-Taking Assistant Content Script Loaded");

// Example: Inject a button into the webpage
const button = document.createElement("button");
button.innerText = "Open Note-Taking Assistant";
button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.zIndex = "1000";
button.style.padding = "10px 20px";
button.style.backgroundColor = "#007BFF";
button.style.color = "#fff";
button.style.border = "none";
button.style.borderRadius = "5px";
button.style.cursor = "pointer";

button.addEventListener("click", () => {
  window.open("http://localhost:3000", "_blank");
});

document.body.appendChild(button);
