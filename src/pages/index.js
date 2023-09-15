import './index.css';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import {
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  buttonOpenAvatarPopup,
  profileDescription,
  profileName,
  profileAvatar,
  validationConfig,
  optionApi,
} from '../utils/Constants.js';

const api = new Api(optionApi);
let userId;

const formValidators = {}
// Включение валидации
const enableValidation = validationConfig => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach(formElement => {
    const validator = new FormValidator(validationConfig, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const cardSection = new Section({
  renderer: item => cardSection.addItem(createCard(item)),
},
  '.elements__grid'
);

const profileUser = new UserInfo({
  name: profileName,
  job: profileDescription,
  avatar: profileAvatar,
});

const popupImage = new PopupWithImage('.popup_type_image');

const userInfoPopup = new PopupWithForm('.popup_type_edit', data => {
  return api.patchUserInfo(data)
    .then(result => {
      profileUser.setUserInfo(result);
    })
    .catch((err) => console.log(err))
});

const popupProfileAdd = new PopupWithForm('.popup_type_profile', data => {
  return api.postAddCard(data)
    .then(result => {
      const card = createCard(result);
      cardSection.prependItem(card);
    })
    .catch((err) => console.log(err))
});

const userAvatarPopup = new PopupWithForm('.popup_type_avatar', data => {
 return api.patchAvatarUrl(data)
    .then((result) => {
      profileUser.setUserInfo(result);
    })
    .catch(err => console.log(err))
});

const PopupWithConfirmDelete = new PopupWithConfirm('.popup_type_delete', null);

const handleCardClick = (name, link) => popupImage.open(name, link);

const createCard = data => {
  const card = new Card({ data, userId, templateSelector: '.template-card', handleCardClick,
    handleSetLike: cardId => {
      api.handleLike(cardId)
        .then(data => card.handleLikeCard(data))
        .catch((err) => console.log(err))
    },
    handleRemoveLike: cardId => {
      api.deleteLike(cardId)
        .then(data => card.handleLikeCard(data))
        .catch((err) => console.log(err))
    },
    handleDelete: cardId => {
      PopupWithConfirmDelete.open();
      PopupWithConfirmDelete.setAction(() =>   
        api.deleteCard(cardId)
          .then(() => {
            card.remove();
            PopupWithConfirmDelete.close()
          })
          .catch((err) => console.log(err)))
    }   
  })
  const cardElement = card.generateCard();
  return cardElement;
}

buttonOpenEditProfilePopup.addEventListener('click', () => {
  userInfoPopup.open();
  userInfoPopup.setInputValues(profileUser.getUserInfo());
  formValidators['type-form'].resetValidation()
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  formValidators['type-form'].resetValidation();
  popupProfileAdd.open();
});

buttonOpenAvatarPopup.addEventListener('click', () => {
  userAvatarPopup.open();
  formValidators['type-form'].resetValidation()
});

popupImage.setEventListeners();
popupProfileAdd.setEventListeners();
userInfoPopup.setEventListeners();
PopupWithConfirmDelete.setEventListeners();
userAvatarPopup.setEventListeners();
enableValidation(validationConfig); 

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    profileUser.setUserInfo(user);
    cardSection.renderItems(cards, userId);
  })
  .catch(err => console.log(err));