//кнопка редактирования
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonCloseEditProfilePopup = popupEditProfile.querySelector('.popup__container-close');

//кнопка добавления
const buttonOpenAddCardPopup = document.querySelector('.profile__plus-button');
const popupAddProfile = document.querySelector('.popup_type_profile');
const buttonCloseAddCardPopup = popupAddProfile.querySelector('.popup__container-close');

//кнопка сохранить
const formElement = document.querySelector('.popup__container-form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

//поля редактирования
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');

//кнопка zoom
const popupZoomImage = document.querySelector('.popup_type_image');
const popupImage = popupZoomImage.querySelector('.popup__image');
const popupCaption = popupZoomImage.querySelector('.popup__caption');
const buttonCloseZoomPopup = popupZoomImage.querySelector('.popup__container-close');

//кнопка создать
const cardInput = popupAddProfile.querySelector('.popup__input_type_card');
const urlInput = popupAddProfile.querySelector('.popup__input_type_url');

//карточки
const sectionElements = document.querySelector('.elements__grid');
const templateElement = document.querySelector('.template-card').content;
const formAddCard = document.querySelector('.popup__container-form_type_card');

//функция закрытия
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//функция открытия
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//функция сохранения
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

const createCard = ({ name, link }) => {
  const elementCard = templateElement.querySelector('.elements__card').cloneNode(true);
  const cardImage = elementCard.querySelector('.elements__img');
  const cardTitle = elementCard.querySelector('.elements__title');
  const likeButton = elementCard.querySelector('.elements__group');
  const basketButton = elementCard.querySelector('.elements__basket');
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  //лайки
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__group_active');
  });

  //зум
  cardImage.addEventListener('click', () => {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupCaption.alt = name;
    openPopup(popupZoomImage);
  });

  //удаление карточек
  basketButton.addEventListener('click', () => {
    elementCard.remove();
  });

  return elementCard;
};

//рендеринг
const renderCards = () => {
  initialCards.forEach((item) => {
    const cardsElement = createCard(item);
    sectionElements.append(cardsElement);
  });
};

//добавление новых карточек
const submitAddCardForm = (evt) => {
  evt.preventDefault();
  const newCard = createCard({ name: cardInput.value, link: urlInput.value });
  sectionElements.prepend(newCard);
  closePopup(popupAddProfile);
};

renderCards();

//функция редактирования
buttonOpenEditProfilePopup.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});
buttonCloseEditProfilePopup.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

//кнопка добавления и закрытия
buttonOpenAddCardPopup.addEventListener('click', () => {
  formAddCard.reset();
  openPopup(popupAddProfile);
});

buttonCloseAddCardPopup.addEventListener('click', () => {
  closePopup(popupAddProfile);
});

buttonCloseZoomPopup.addEventListener('click', () => {
  closePopup(popupZoomImage);
});

formElement.addEventListener('submit', handleEditFormSubmit);
formAddCard.addEventListener('submit', submitAddCardForm);