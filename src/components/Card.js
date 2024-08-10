class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._cardButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._cardDelete.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleLikeButton() {
    this._cardButton.classList.toggle("card__button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardButton = this._cardElement.querySelector(".card__button");
    this._cardDelete = this._cardElement.querySelector(".card__delete_button");

    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
