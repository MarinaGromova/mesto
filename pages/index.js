import {
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  cardInput,
  formAddCard,
  formEditProfile,
  initialCards,
  jobInput,
  nameInput,
  popupAddProfile,
  popupEditProfile,
  popupZoomImage,
  profileDescription,
  profileName,
  sectionElements,
  urlInput,
  validationConfig,
} from '../utils/Constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formValidatorEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
const formValidatorAddCard = new FormValidator(validationConfig, formAddCard);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  '.elements__grid'
);

const popupImage = new PopupWithImage(popupZoomImage);

const profileUser = new UserInfo({
  selectorName: profileName,
  selectorJob: profileDescription,
});

const userInfoPopup = new PopupWithForm(popupEditProfile, (data) => {
  profileUser.setUserInfo(data);
  userInfoPopup.close();
});

const popupProfileAdd = new PopupWithForm(popupAddProfile, () => {
  const nameNewCard = cardInput.value;
  const linkNewCard = urlInput.value;
  const card = createCard(
    { name: nameNewCard, link: linkNewCard },
    sectionElements
  );
  sectionElements.prepend(card);
  popupProfileAdd.close();
});

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function createCard(data) {
  const card = new Card(data, '.template-card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

buttonOpenEditProfilePopup.addEventListener('click', () => {
  userInfoPopup.open();
  const profileUserInfo = profileUser.getUserInfo();
  nameInput.value = profileUserInfo.inputName;
  jobInput.value = profileUserInfo.inputJob;
  formValidatorEditProfile.resetValidation();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  formAddCard.reset();
  popupProfileAdd.open();
  formValidatorAddCard.resetValidation();
});

cardSection.renderItems();
popupImage.setEventListeners();
popupProfileAdd.setEventListeners();
userInfoPopup.setEventListeners();

formValidatorEditProfile.enableValidation();
formValidatorAddCard.enableValidation();