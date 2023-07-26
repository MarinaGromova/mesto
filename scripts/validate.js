const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__container-submit',
  inactiveButtonClass: 'popup__container-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//функция показывает элемент ошибки

const showInputError = (formElement, inputElement, validationConfig) => {
  const spanElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  spanElement.textContent = inputElement.validationMessage;
  spanElement.classList.add(validationConfig.errorClass);
}

//функция скрывает элемент ошибки

const hideInputError = (formElement, inputElement, validationConfig) => {
  const spanElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  spanElement.classList.remove(validationConfig.errorClass);
  spanElement.textContent = '';
}

//проверка на валидность

const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig)
  }
  else {
    hideInputError(formElement, inputElement, validationConfig)
  }
}

//обработчик всех полей

const setEventListeners = (formElement, validationConfig) =>{
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    })
  })
}

//обработчик всех форм

function enableValidation (validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(formElement =>
    setEventListeners(formElement, validationConfig)
  )
}

//функция проверки полей на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid) 
}

//функция состояния кнопки

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
  }

enableValidation (validationConfig)

