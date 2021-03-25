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
  const dateSelect = new Date(input.value)
  const dateToDay = new Date()
  if(input.value.trim() === "") {
    return inputError(input, "Veuillez entrer votre date de naissance")
  } else {
    if(dateSelect > dateToDay) {
      return inputError(input, "Veuillez entrer une date de naissance valide")
    } else {
      return inputValid(input)
    }
  }
}

function validateNbTournament(input) {
  inputValidation(
    input,
    "^[0-9]{1,2}$",
    "Veuillez entrer le nombre de tournois participés",
    "Veulliez entrer un nombre compris entre 0 et 99"
  );
}

function validateCity(inputs) {
  let inputIsChecked = null;
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

export {
  validateText,
  validateMail,
  validateDate,
  validateNbTournament,
  validateCity,
  validateCondition,
};
