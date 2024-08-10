import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import {
  initialCards,
  settings,
  cardListEl,
  profileEditModal,
  profileEditForm,
  addCardModal,
  addCardForm,
  profileEditBtn,
  profileName,
  profileDescription,
  addNewCardButton,
  profileNameInput,
  profileDescriptionInput,
} from "../utils/constants.js";

/* Functions */

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = getCardElement(cardData);
      cardSection.addItem(cardElement);
    },
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
  console.log(userData);
  const name = userData.name - text;
  const description = userData.description;
  userInfo.setUserInfo(name, description);
  editProfilePopup.close();
}

function handleAddCardSubmit(inputData) {
  const name = inputData.name;
  const link = inputData.link;

  console.log(`Name: ${name}, Link: ${link}`);

  renderCard({ name, link }, cardListEl);
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
  profileNameInput.value = userData.nameSelector;
  profileDescriptionInput.value = userData.descriptionSelector;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
  addFormValidator.toggleButtonState();
});

/* Validation */

const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addCardForm);
addFormValidator.enableValidation();

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
