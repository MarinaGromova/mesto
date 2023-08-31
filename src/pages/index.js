import './index.css'
import {
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  cardInput,
  formAddCard,
  formEditProfile,
  initialCards,
  profileDescription,
  profileName,
  validationConfig,
} from '../utils/Constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formValidators = {}
// Включение валидации
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  '.elements__grid'
);

const popupImage = new PopupWithImage('.popup_type_image');

const profileUser = new UserInfo({
  name: profileName,
  job: profileDescription,
});

const userInfoPopup = new PopupWithForm('.popup_type_edit', (data) => {
  profileUser.setUserInfo(data);
  userInfoPopup.close();
});

const popupProfileAdd = new PopupWithForm('.popup_type_profile', (data) => { 
  const card = createCard(data);
  cardSection.prependItem(card);
  popupProfileAdd.close();
});

const handleCardClick= (name, link) => {
  popupImage.open(name, link);
}

const createCard = (data) => {
  const card = new Card(data, '.template-card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

buttonOpenEditProfilePopup.addEventListener('click', () => {
  userInfoPopup.open();
  userInfoPopup.setInputValues(profileUser.getUserInfo());
  formValidators['type-form'].resetValidation()
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  popupProfileAdd.open();
  formValidators['type-form'].resetValidation()
});

cardSection.renderItems();
popupImage.setEventListeners();
popupProfileAdd.setEventListeners();
userInfoPopup.setEventListeners();

enableValidation(validationConfig);