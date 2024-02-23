// Funciones

// funcion para validar el formulario de modal y addNewCardModal

function isValid(form) {
    const inputList = Array.from(
      form.querySelectorAll(".modal__contenido-nombre, .modal__contenido-enlace")
    );
    return inputList.every((item) => {
      return item.validity.valid;
    });
  }
  
  function isValidNew(formaddNewCardModal) {
    const inputList = Array.from(
      formaddNewCardModal.querySelectorAll(
        ".addNewCardModal__contenido-nombre, .addNewCardModal__contenido-enlace"
      )
    );
    return inputList.every((item) => {
      return item.validity.valid;
    });
  }


export default class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.submitButton = this.formElement.querySelector(this.config.submitButtonSelector);
    }

    _isValid() {
        const inputList = Array.from(
            this.formElement.querySelectorAll(this.config.inputSelector)
        );
        return inputList.every((input) => {
            return input.validity.valid;
        });
    }

    _checkInputValidity(input) {
        const errorNode = this.formElement.querySelector(
            `.modal__contenido-error_${input.name}`
        );
        if (input.validity.valid) {
            input.classList.remove("modal__contenido-error");
            errorNode.textContent = "";
        } else {
            input.classList.add("modal__contenido-error");
            errorNode.textContent = input.validationMessage;
        }
    }

    _toggleSubmitButtonState() {
        this.submitButton.disabled = !this._isValid();
    }

    _setEventListeners() {
        this.formElement.addEventListener("input", (event) => {
            const input = event.target;
            this._checkInputValidity(input);
            this._toggleSubmitButtonState();
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}

const formElement = document.querySelector('#my-form');
const validator = new FormValidator({ inputSelector: '.modal__contenido-nombre, .modal__contenido-enlace', submitButtonSelector: '.submit-button' }, formElement);
validator.enableValidation();