class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(inputEl) {
    this._errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    this._errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.classList.remove(this._errorClass);
    this._errorMessageEl.textContent = "";
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  disabledButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }

  enabledButton(submitButton, inactiveButtonClass) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    const submitButton = this._form.querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput()) {
      this.disabledButton(submitButton, this._inactiveButtonClass);
      return;
    }
    this.enabledButton(submitButton, this._inactiveButtonClass);
  }

  resetValidation() {
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputEl) => {
      this._errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
      this._hideInputError(inputEl, this._errorMessageEl);
    });
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
