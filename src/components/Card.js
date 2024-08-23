class Card {
  constructor(
    { data, handleImageClick, handleLikeClick, handleDeleteCardClick },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getId() {
    return this._id;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._cardDelete.addEventListener("click", () => {
      this._handleDeleteCardClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleLikeButton() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__button_active");
    } else {
      this._likeButton.classList.remove("card__button_active");
    }
  }

  handleLike(isLiked) {
    this._isLiked = isLiked;
    this._handleLikeButton();
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardButton = this._cardElement.querySelector(".card__button");
    this._cardDelete = this._cardElement.querySelector(".card__delete_button");

    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._handleLikeButton();
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
