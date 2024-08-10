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
      console.log(`Input Name: ${input.name}, Input Value: ${input.value}`);
      this._inputData[input.name] = input.value;
    });

    console.log(`Form values:`, this._inputData);
    return this._inputData;
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
      this._form.reset();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}
