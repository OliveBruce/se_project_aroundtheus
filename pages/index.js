import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* Wrappers*/
const cardListEl = document.querySelector(".gallery__cards");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = document.forms["profile-edit-form"];
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];
const imagePreview = document.querySelector("#image-preview-modal");
const previewImage = document.querySelector(".modal__preview_image");
const previewTitle = document.querySelector(".modal__preview_title");
const modals = document.querySelectorAll(".modal");

/* Buttons & other DOM nodes */
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileModalClose = profileEditModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name-text");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector("#profile-add-button");
const addNewCardModalClose = addCardModal.querySelector(".modal__close");
const imagePreviewClose = imagePreview.querySelector(".modal__close");

/* Form data */
const profileNameInput = profileEditModal.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = profileEditModal.querySelector(
  ".modal__input_type_description"
);
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

const cardSelector = "#card-template";

/* Functions */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

// Function to handle the Escape key press
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModals = document.querySelectorAll(".modal_opened");
    openModals.forEach((modal) => closePopup(modal));
  }
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function fillProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleImageClick(name, link) {
  openPopup(imagePreview);
  previewImage.src = link;
  previewImage.alt = name;
  previewTitle.textContent = name;
}

/* Event Handlers */

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
  profileEditForm.reset();
}

function createCard(newCard) {
  const card = new Card(newCard, cardSelector, handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  addFormValidator.disabledButton();
  closePopup(addCardModal);
  addCardForm.reset();
}

/* Event Listeners */

profileEditBtn.addEventListener("click", () => {
  fillProfileForm();
  editFormValidator.resetValidation();
  openPopup(profileEditModal);
});

// add new card button
addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

// close modal with click
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(modal);
    }
  });
});

// Form Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((card) => {
  renderCard(card);
});

/* Validation */
const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settings, addCardForm);
addFormValidator.enableValidation();
