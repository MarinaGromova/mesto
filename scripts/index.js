import { initialCards, validationConfig } from './constants.js';
import Card from './card.js';
import FormValidator from './formValidator.js';


//кнопка редактирования
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonCloseEditProfilePopup = popupEditProfile.querySelector('.popup__container-close');

//кнопка добавления
const buttonOpenAddCardPopup = document.querySelector('.profile__plus-button');
const popupAddProfile = document.querySelector('.popup_type_profile');
const buttonCloseAddCardPopup = popupAddProfile.querySelector('.popup__container-close');

//кнопка сохранить
const formEditProfile = popupEditProfile .querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_job');

//поля редактирования
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');

//кнопка zoom
export const popupZoomImage = document.querySelector('.popup_type_image');
export const popupImage = popupZoomImage.querySelector('.popup__image');
export const popupCaption = popupZoomImage.querySelector('.popup__caption');
const buttonCloseZoomPopup = popupZoomImage.querySelector('.popup__container-close');

//кнопка создать
const cardInput = popupAddProfile.querySelector('.popup__input_type_card');
const urlInput = popupAddProfile.querySelector('.popup__input_type_url');

//карточки
const sectionElements = document.querySelector('.elements__grid');
const formAddCard = document.querySelector('.popup__form_type_card');

//оверлей
const popupList = document.querySelectorAll('.popup');

//функция закрытия
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//функция открытия
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//закрытие форм по кнопке Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened)
  }
}

//оверлей
popupList.forEach((item) => item.addEventListener('mousedown', function(evt){
  if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
  }
}))

//функция сохранения
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

//создаем карточку
function createCard(data) {
  const card = new Card(data, '.template-card');
  const cardElement = card.generateCard();
  return cardElement;
};

function submitAddCardForm(evt) {
  evt.preventDefault();
  const nameNewCard = cardInput.value;
  const linkNewCard = urlInput.value;
  const card = createCard({name:nameNewCard, link:linkNewCard}, sectionElements);
  sectionElements.prepend(card);
  closePopup(popupAddProfile);
};

//подгружаем массив в html
initialCards.forEach((item) => {
  const card = createCard(item);
  sectionElements.append(card);
});

//функция редактирования
buttonOpenEditProfilePopup.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  const formValidator = new FormValidator(validationConfig);
  formValidator.enableValidation();
});

buttonCloseEditProfilePopup.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

//кнопка добавления и закрытия
buttonOpenAddCardPopup.addEventListener('click', () => {
  formAddCard.reset();
  openPopup(popupAddProfile);
  const formValidator = new FormValidator(validationConfig);
  formValidator.enableValidation();
});

buttonCloseAddCardPopup.addEventListener('click', () => {
  closePopup(popupAddProfile);
});

buttonCloseZoomPopup.addEventListener('click', () => {
  closePopup(popupZoomImage);
});

formEditProfile.addEventListener('submit', handleEditFormSubmit);
formAddCard.addEventListener('submit', submitAddCardForm);