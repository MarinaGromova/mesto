export { validationConfig, optionApi };

//кнопка редактирования
export const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_type_edit');
//кнопка добавления
export const buttonOpenAddCardPopup = document.querySelector('.profile__plus-button');
export const popupAddProfile = document.querySelector('.popup_type_profile');
//кнопка сохранить
export const formEditProfile = popupEditProfile .querySelector('.popup__form');
export const nameInput = formEditProfile.querySelector('.popup__input_type_name');
export const jobInput = formEditProfile.querySelector('.popup__input_type_job');
//поля редактирования
export const profileName = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__text');
//крестик
export const closeButtons = document.querySelectorAll('.popup__container-close');
//кнопка zoom
export const popupZoomImage = document.querySelector('.popup_type_image');
export const popupImage = popupZoomImage.querySelector('.popup__image');
export const popupCaption = popupZoomImage.querySelector('.popup__caption');
//кнопка создать
// export const cardInput = popupAddProfile.querySelector('.popup__input_type_card');
export const urlInput = popupAddProfile.querySelector('.popup__input_type_url');
//карточки
export const sectionElements = document.querySelector('.elements__grid');
// export const formAddCard = document.querySelector('.popup__form_type_card');
//оверлей
export const popupList = document.querySelectorAll('.popup');
//аватар
export const buttonOpenAvatarPopup = document.querySelector('.profile__image');
export const profileAvatar = document.querySelector('.profile__avatar');

// const initialCards = [
//   {
//     name: 'Лайм',
//     link: 'https://images.unsplash.com/photo-1596404643764-2a2461483a3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80'
//   },
//   {
//     name: 'Колос',
//     link: 'https://images.unsplash.com/photo-1687201363617-f2f6eee77c26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=363&q=80'
//   },
//   {
//     name: 'Пальма',
//     link: 'https://images.unsplash.com/photo-1599832110430-da30b996c917?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80'
//   },
//   {
//     name: 'Треугольник',
//     link: 'https://plus.unsplash.com/premium_photo-1674829260369-e8113bdd613e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80'
//   },
//   {
//     name: 'Цветок',
//     link: 'https://images.unsplash.com/photo-1668024152734-7756edd49048?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
//   },
//   {
//     name: 'Розовый колос',
//     link: 'https://images.unsplash.com/photo-1674590798230-720b55dc5bc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
//   },
// ];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__container-submit",
  inactiveButtonClass: "popup__container-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const optionApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75/',
  headers: {
    authorization: '4907d606-220d-4e7a-be79-b47f5f6b6f53',
    'Content-Type': "application/json"
  }
};