function editNav() {
  var x = document.getElementById("myTopnav");
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
  var animationDuration = 800;
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

function validateText(input, name) {
  inputValidation(
    input,
    "^[a-zA-Z- ]{2,20}$",
    "Veuillez remplir le champs " + name,
    "Le champs doit contenir que des lettres et avoir au moins 2 caractères"
  );
}

function validateMail(input) {
  inputValidation(
    input,
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "Veuillez remplir le champs mail",
    "Veuillez entrer une adresse mail valide"
  );
}

function validateDate(input) {
  inputValidation(input, "", "Veuillez entrer votre date de naissance");
}

function validateNbTournament(input) {
  inputValidation(
    input,
    "^[0-9]{1,2}$",
    "Veuillez entrer le nombre de tournois participés",
    "Veulliez entrer un nombre compris entre 0 et 99"
  );
}

function validateCondition(input) {
  inputValidationChecked(
    input,
    "Veuillez accepter les conditions d'utilisation"
  );
}

function inputValidation(input, pattern, textIsEmpty, textNoValid) {
  if (input.value.trim() === "") {
    return inputError(input, textIsEmpty);
  } else {
    return inputRegExp(input, pattern, textNoValid);
  }
}

function inputRegExp(input, pattern, textNoValid) {
  var pattern = new RegExp(pattern, "g");

  if (pattern.test(input.value)) {
    return inputValid(input);
  } else {
    return inputError(input, textNoValid);
  }
}

function validateCity(inputs) {
  var inputIsChecked = null;
  inputs.forEach((input) => {
    if (input.checked) {
      inputIsChecked++;
    }
  });
  if (inputIsChecked == 1) {
    return inputValid(inputs[0]);
  } else {
    return inputError(inputs[0], "Veuillez choisir une ville");
  }
}

function inputValidationChecked(input, textNoValid) {
  if (input.checked) {
    return inputValid(input);
  } else {
    return inputError(input, textNoValid);
  }
}

function inputError(input, text) {
  return (
    (input.parentNode.dataset.error = text),
    (input.parentNode.dataset.errorVisible = "true")
  );
}

function inputValid(input) {
  return (
    (input.parentNode.dataset.error = ""),
    (input.parentNode.dataset.errorVisible = "false")
  );
}

function validate() {
  var validateInputs = 0;

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].parentNode.dataset.error == "") {
      validateInputs++;
    }
  }
  if (inputs.length == validateInputs) {
    document.getElementById("inscription").style.display = "none";
    document.getElementById("form-valid").style.display = "block";
  }
}
