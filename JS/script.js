const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const containerСlose = document.querySelector(".popup__container-close");
const containerSubmit = document.querySelector(".popup__container-submit");
const formElement = document.querySelector(".popup__container-form");
const nameInput = formElement.querySelector(".popup__input_name");
const jobInput = formElement.querySelector(".popup__input_job");
const profileTitle = document.querySelector(".profile__title");
const profileText = document.querySelector(".profile__text");

function showClick() {
  popup.classList.add("popup_opened");
}

function closeClick() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", showClick);
containerСlose.addEventListener("click", closeClick);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closeClick();
}

formElement.addEventListener("submit", handleFormSubmit);
