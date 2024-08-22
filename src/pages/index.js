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
const changeAvatarForm = document.forms["change-avatar-form"];

/* Buttons & other DOM nodes */
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileName = document.querySelector(".profile__name-text");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector("#profile-add-button");
const avatarChangeBtn = document.querySelector("#avatar-change-button");
const avatarImage = document.querySelector(".profile__avatar");

/* Form data */
const profileNameInput = profileEditModal.querySelector("#owner-name");
const profileDescriptionInput =
  profileEditModal.querySelector("#owner-description");

const cardSelectors = {
  cardTemplate: "#card-template",
};

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

const avatarChangePopup = new PopupWithForm(
  {
    popupSelector: "#change-avatar-modal",
  },
  handleChangeAvatarSubmit
);
avatarChangePopup.setEventListeners();

const confirmDeletePopup = new PopupWithForm(
  {
    popupSelector: "#confirm-delete-modal",
  },
  handleDeleteCardSubmit
);
confirmDeletePopup.setEventListeners();

const userInfo = new UserInfo(profileName, profileDescription, avatarImage);

const api = new Api({
  url: "https://around-api.en.tripleten-services.com/v1",
  token: "180fed17-f626-4f59-8309-4b759f5f0038",
});

api
  .getInfoAndCards()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ name: userData.name, description: userData.about }); //render profile info
    userInfo.setUserAvatar(userData.avatar); //render profile pic
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

const cardSection = new Section(
  {
    renderer: (data) => {
      cardSection.addItem(renderCard(data));
    },
  },
  ".gallery__cards"
);

/* Event Handlers */

function renderCard(data) {
  const card = new Card(
    {
      data,
      handleImageClick: () => {
        popupWithImage.open(data);
      },
      handleLikeClick: (card) => {
        api
          .likeCardStatus(card.getId(), !card._isLiked)
          .then((data) => {
            card.handleLike(data.isLiked);
          })
          .catch(console.error);
      },
      handleDeleteCardClick: handleDeleteCardSubmit,
    },
    cardSelectors.cardTemplate
  );
  return card.getView();
}

function handleProfileEditSubmit(userData) {
  const name = userData.name;
  const description = userData.description;
  editProfilePopup.modalSaving(true);

  api
    .updateUserInfo({ name: name, description: description })
    .then(() => {
      userInfo.setUserInfo({ name: name, description: description });
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
      const newCard = renderCard(res);
      cardSection.addItem(newCard);
      console.log(newCard);
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

function handleChangeAvatarSubmit(avatarUrl) {
  avatarChangePopup.modalSaving(true);

  api
    .changeAvatar(avatarUrl.link)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      avatarChangePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarChangePopup.modalSaving(false);
    });
}

function handleDeleteCardSubmit(cardData) {
  confirmDeletePopup.open();

  confirmDeletePopup.setSubmitHandler(() => {
    api
      .deleteCard(cardData._id)
      .then(() => {
        cardData.handleDeleteCard();
        confirmDeletePopup.close();
      })
      .catch(console.error);
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

avatarChangeBtn.addEventListener("click", () => {
  avatarChangePopup.open();
  formValidators["avatar-form"].toggleButtonState();
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
