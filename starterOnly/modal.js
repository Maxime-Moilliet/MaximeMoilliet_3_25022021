import {
  validateText,
  validateMail,
  validateDate,
  validateNbTournament,
  validateCity,
  validateCondition,
} from "./inputValidation.js";

function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const jsContent = document.getElementById("js-content");
const jsClose = modalbg.querySelector(".js-close");
const jsCloseValid = document.getElementById("js-close-valid");

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal(e) {
  e.preventDefault();
  setDisplayModal();
  setArias();
  modalbg.addEventListener("click", closeModal);
  jsContent.addEventListener("click", stopPropagation);
  jsClose.addEventListener("click", closeModal);
  jsCloseValid.addEventListener("click", closeModal);
}

function closeModal(e) {
  e.preventDefault();
  let animationDuration = 800;
  window.setTimeout(function () {
    setDisplayModal();
  }, animationDuration);
  setArias();
  modalbg.removeEventListener("click", closeModal);
  jsContent.removeEventListener("click", stopPropagation);
  jsClose.removeEventListener("click", closeModal);
  jsCloseValid.removeEventListener("click", closeModal);
}

function stopPropagation(e) {
  e.stopPropagation();
}

function setDisplayModal() {
  if (modalbg.style.display === "none") {
    return (modalbg.style.display = "block");
  } else {
    return (modalbg.style.display = "none");
  }
}

function setArias() {
  return setAriaHidden(), setAriaModal();
}

function setAriaHidden() {
  if (modalbg.getAttribute("aria-hidden") === "false") {
    return modalbg.setAttribute("aria-hidden", "true");
  } else {
    return modalbg.setAttribute("aria-hidden", "false");
  }
}

function setAriaModal() {
  if (modalbg.getAttribute("aria-modal") === "true") {
    return modalbg.setAttribute("aria-modal", "false");
  } else {
    return modalbg.setAttribute("aria-modal", "true");
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Esc" || e.key === "Escape") {
    if (modalbg.getAttribute("aria-hidden") === "false") {
      closeModal(e);
    }
  }
});

const inputs = [
  document.getElementById("first"),
  document.getElementById("last"),
  document.getElementById("email"),
  document.getElementById("birthdate"),
  document.getElementById("quantity"),
  document.getElementById("checkbox1"),
];

const inputsRadio = [
  document.getElementById("location1"),
  document.getElementById("location2"),
  document.getElementById("location3"),
  document.getElementById("location4"),
  document.getElementById("location5"),
  document.getElementById("location6"),
];

document.getElementById("inscription").addEventListener("submit", function (e) {
  e.preventDefault();
  validateText(inputs[0], "prénom");
  validateText(inputs[1], "nom");
  validateMail(inputs[2]);
  validateDate(inputs[3]);
  validateNbTournament(inputs[4]);
  validateCity(inputsRadio);
  validateCondition(inputs[5]);
  validate();
});

function validate() {
  let validateInputs = 0;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].parentNode.dataset.error == "") {
      validateInputs++;
    }
  }
  if (inputs.length == validateInputs) {
    document.getElementById("inscription").style.display = "none";
    document.getElementById("form-valid").childNodes.style.display = "block";
  }
}
