import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    this._inputData = {};
    this._inputList.forEach((input) => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formValues = this._getInputValues();
      this._handleFormSubmit(formValues);
      this._form.reset();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
