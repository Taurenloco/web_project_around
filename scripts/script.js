import FormValidator from "./FormValidator.js";
import { agregarCardsIniciales } from "./utils.js";

const formProfile = document.querySelector(".modal__form");
const validatorProfile = new FormValidator(
  {
    inputSelector: ".modal__contenido-nombre, .modal__contenido-enlace",
    submitButtonSelector: ".modal__contenido-crear",
  },
  formProfile
);

const formNewCard = document.querySelector(".addnewcardmodal__form");
const validatorNewCard = new FormValidator(
  {
    inputSelector: ".modal__contenido-nombre, .modal__contenido-enlace",
    submitButtonSelector: ".addnewcardmodal__contenido-crear",
  },
  formNewCard
);

agregarCardsIniciales();

validatorProfile.enableValidation();
validatorNewCard.enableValidation();
