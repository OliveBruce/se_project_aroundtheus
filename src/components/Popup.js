export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("click", this._handleClickOverlay);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("click", this._handleClickOverlay);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickOverlay = (evt) => {
    if (evt.target === this._popupElement || evt.target === this._closeButton) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}
