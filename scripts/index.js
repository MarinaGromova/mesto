const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const containerСlose = document.querySelector('.popup__container-close');
const containerSubmit = document.querySelector('.popup__container-submit');
const formElement = document.querySelector('.popup__container-form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');

function showClick() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileText.textContent;
  popup.classList.add('popup_opened');
}

function closeClick() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closeClick();
}

editButton.addEventListener('click', showClick);
containerСlose.addEventListener('click', closeClick);
formElement.addEventListener('submit', handleFormSubmit);
