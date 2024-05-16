export default class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this.formElement = formElement;
    this.submitButton = this.formElement.querySelector(
      this.config.submitButtonSelector
    );
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
    this._toggleSubmitButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
