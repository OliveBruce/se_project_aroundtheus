import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { initialCards, settings } from "../utils/constants.js";

/* Wrappers*/
const cardListEl = document.querySelector(".gallery__cards");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = document.forms["profile-edit-form"];
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];

/* Buttons & other DOM nodes */
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileName = document.querySelector(".profile__name-text");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector("#profile-add-button");

/* Form data */
const profileNameInput = profileEditModal.querySelector("#owner-name");
const profileDescriptionInput =
  profileEditModal.querySelector("#owner-description");

/* Functions */

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".gallery__cards"
);

cardSection.renderItems();

/* Event Handlers */

function renderCard(data) {
  const cardElement = getCardElement(data);
  cardSection.addItem(cardElement);
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function handleProfileEditSubmit(userData) {
  const name = userData.name;
  const description = userData.description;
  userInfo.setUserInfo(name, description);
  editProfilePopup.close();
}

function handleAddCardSubmit(inputData) {
  const cardData = { name: inputData.title, link: inputData.url };

  renderCard(cardData);
  newCardPopup.close();
  addCardForm.reset();
}

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

const userInfo = new UserInfo(profileName, profileDescription);

// Form Listeners
profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
  formValidators["add-form"].toggleButtonState();
});

/* Validation */
const formValidators = {};

const formList = [...document.querySelectorAll(".modal__form")];
formList.forEach((formElement) => {
  const validator = new FormValidator(settings, formElement);
  const formName = formElement.getAttribute("name");

  formValidators[formName] = validator;
  validator.enableValidation();
});

const popupWithImage = new PopupWithImage({
  popupSelector: "#image-preview-modal",
});
popupWithImage.setEventListeners();

const newCardPopup = new PopupWithForm(
  {
    popupSelector: "#add-card-modal",
  },
  handleAddCardSubmit
);
newCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
  },
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();
