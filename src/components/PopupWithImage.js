import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._previewImageElement = this._popupElement.querySelector(
      ".modal__preview_image"
    );
    this._previewImageElementTitle = this._popupElement.querySelector(
      ".modal__preview_title"
    );
  }

  open(cardData) {
    this._previewImageElement.src = cardData.link;
    this._previewImageElement.alt = cardData.name;
    this._previewImageElementTitle.textContent = cardData.name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
