import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import { initialCards, settings } from "../utils/constants.js";
import Api from "../components/Api.js";

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
const profileModalSubmitButton =
  profileEditModal.querySelector(".modal__button");
const addCardSubmitButton = addCardModal.querySelector(".modal__button");

/* Functions */

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

const userInfo = new UserInfo(profileName, profileDescription);

const api = new Api({
  url: "https://around-api.en.tripleten-services.com/v1",
  token: "180fed17-f626-4f59-8309-4b759f5f0038",
});

api
  .getInfoAndCards()
  .then(({ userInfo, cards }) => {
    console.log({ userInfo, cards });
    user.setUserInfo({ name: userInfo.name, job: userInfo.about }); //render profile info
    user.setUserAvatar(userInfo.avatar); //render profile pic
    cardSection.renderItems(cards); //render cards from server
  })
  .catch((err) => {
    console.error(err);
  });

const cardSection = new Section(
  {
    renderer: (data) => {
      cardSection.addItem(createCard(data));
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
  const name = userData.name;
  const description = userData.description;
  console.log("name:", name, "job:", description); //debug log
  editProfilePopup.modalSaving(true);

  api
    .updateUserInfo(name, description)
    .then(() => {
      userInfo.setUserInfo(name, description);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.modalSaving(false);
    });
}

function handleAddCardSubmit(inputData) {
  const cardData = { name: inputData.title, link: inputData.url };
  newCardPopup.modalSaving(true);

  api
    .addCard(cardData)
    .then((res) => {
      renderCard(res);
      newCardPopup.close();
      addCardForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopup.modalSaving(false);
    });
}

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

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
