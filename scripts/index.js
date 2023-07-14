//кнопка редактирования
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupCloseProfile = popupEditProfile.querySelector('.popup__container-close');

//кнопка добавления
const AddplusButton = document.querySelector('.profile__plus-button');
const popupAddProfile = document.querySelector('.popup_type_profile');
const popupCloseProfileCard = popupAddProfile.querySelector('.popup__container-close');

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
const popupCloseZoom = popupZoomImage.querySelector('.popup__container-close');

//кнопка создать
const cardInput = popupAddProfile.querySelector('.popup__input_type_card');
const urlInput = popupAddProfile.querySelector('.popup__input_type_url');

//карточки
const sectionElements = document.querySelector('.elements__grid');
const templateElement = document.querySelector('.template-card').content;
const formElementCard = document.querySelector('.popup__container-form_type_card');

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
const AddNewCard = (evt) => {
  evt.preventDefault();
  const newCard = createCard({ name: cardInput.value, link: urlInput.value });
  sectionElements.prepend(newCard);
  cardInput.value = '';
  urlInput.value = '';
  closePopup(popupAddProfile);
};

renderCards();

//функция редактирования
editProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});
popupCloseProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

//кнопка добавления и закрытия
AddplusButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupAddProfile);
});

popupCloseProfileCard.addEventListener('click', () => {
  closePopup(popupAddProfile);
});

popupCloseProfileCard.addEventListener('click', closePopup(popupAddProfile));

popupCloseZoom.addEventListener('click', () => {
  closePopup(popupZoomImage);
});

formElement.addEventListener('submit', handleEditFormSubmit);
formElementCard.addEventListener('submit', AddNewCard);