import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._saveButton = this._form.querySelector(".modal__button");
    this._saveButtonText = this._saveButton.textContent;
  }

  setSubmitHandler(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputData = {};
    this._inputList.forEach((input) => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
  }

  saveModal(isSaving, saveText = "Saving...") {
    if (isSaving) {
      this._saveButton.textContent = saveText;
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formValues = this._getInputValues();
      this._handleFormSubmit(formValues);
    });
    super.setEventListeners();
  }
}
