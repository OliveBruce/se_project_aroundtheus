export const initialCards = [
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

export const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

/* Wrappers*/
export const cardListEl = document.querySelector(".gallery__cards");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditForm = document.forms["profile-edit-form"];
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardForm = document.forms["add-card-form"];

/* Buttons & other DOM nodes */
export const profileEditBtn = document.querySelector("#profile-edit-button");
export const profileName = document.querySelector(".profile__name-text");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const addNewCardButton = document.querySelector("#profile-add-button");

/* Form data */
export const profileNameInput = profileEditModal.querySelector("#owner-name");
export const profileDescriptionInput =
  profileEditModal.querySelector("#owner-description");
