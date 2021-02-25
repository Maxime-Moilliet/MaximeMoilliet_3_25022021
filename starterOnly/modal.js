function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const jsContent = document.getElementById("js-content");
const jsClose = modalbg.querySelector(".js-close");
const formData = document.querySelectorAll(".formData");
const form = document.forms["inscription"];

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal(e) {
  e.preventDefault();
  modalbg.style.display = "block";
  modalbg.removeAttribute("aria-hidden");
  modalbg.setAttribute("aria-modal", "true");
  modalbg.addEventListener("click", closeModal);
  jsContent.addEventListener("click", stopPropagation);
  jsClose.addEventListener("click", closeModal);
}

const animationDuration = 800;

function closeModal(e) {
  e.preventDefault();
  window.setTimeout(function () {
    modalbg.style.display = "none";
  }, animationDuration);
  modalbg.setAttribute("aria-hidden", "true");
  modalbg.removeAttribute("aria-modal");
  modalbg.removeEventListener("click", closeModal);
  jsContent.removeEventListener("click", stopPropagation);
  jsClose.removeEventListener("click", closeModal);
}

function stopPropagation(e) {
  e.stopPropagation();
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Esc" || e.key === "Escape") {
    closeModal(e);
  }
});

form.addEventListener("submit", function (e) {
  if (!form["first"].value) {
    e.preventDefault();
    formData[0].dataset.error = "Veuillez remplir le champs.";
    formData[0].dataset.errorVisible = "true";
  }
  var zz = form["first"].value;
  console.log(zz);
  console.log(zz.lengh);
  debugger;
});
