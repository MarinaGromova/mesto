//кнопка редактирования
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupClose = popupEdit.querySelector('.popup__container-close');

//кнопка добавления
const plusButton = document.querySelector('.profile__plus-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCloseProfile = popupProfile.querySelector('.popup__container-close');

//кнопка сохранить
const formElement = document.querySelector('.popup__container-form');
const containerSubmit = document.querySelector('.popup__container-submit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

//поля редактирования
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');

//кнопка zoom
const popupZoom = document.querySelector('.popup_type_image');
const popupImage = popupZoom.querySelector('.popup__image');
const popupCaption = popupZoom.querySelector('.popup__caption');
const popupCloseZoom = popupZoom.querySelector('.popup__container-close');

//кнопка создать
const cardInput = popupProfile.querySelector('.popup__input_type_card');
const urlInput = popupProfile.querySelector('.popup__input_type_url');

//карточки
const cardsSection = document.querySelector('.elements__grid');
const cardTemplate = document.querySelector('.template-card').content;
const popupCardForm = document.querySelector(
  '.popup__container-form_type_card'
);

//функция закрытия
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//функция открытия
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//функция редактирования
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileText.textContent;
});
popupClose.addEventListener('click', () => {
  closePopup(popupEdit);
});

//функция сохранения
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(popupEdit);
}
formElement.addEventListener('submit', handleFormSubmit);

//кнопка добавления и закрытия
plusButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileText.textContent;
  openPopup(popupProfile);
});
popupCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});
popupCloseProfile.addEventListener('click', closePopup(popupProfile));

const createCard = ({ name, link }) => {
  const elementCard = cardTemplate
    .querySelector('.elements__card')
    .cloneNode(true);
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
    openPopup(popupZoom);
  });
  popupCloseZoom.addEventListener('click', () => {
    closePopup(popupZoom);
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
    cardsSection.append(cardsElement);
  });
};
renderCards();

//добавление новых карточек
const newCard = (evt) => {
  evt.preventDefault();
  const newCard = createCard({ name: cardInput.value, link: urlInput.value });
  cardsSection.prepend(newCard);
  closePopup(popupProfile);
};

popupCardForm.addEventListener('submit', newCard);