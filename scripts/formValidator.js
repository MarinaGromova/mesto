export default class FormValidator {
  constructor (validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;
  }

  //функция показывает элемент ошибки
  _showInputError(formElement, inputElement) {
    const spanElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    spanElement.textContent = inputElement.validationMessage;
    spanElement.classList.add(this._errorClass);
  };
 
  //функция скрывает элемент ошибки
  _hideInputError(formElement, inputElement) {
    const spanElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    spanElement.classList.remove(this._errorClass);
    spanElement.textContent = "";
  };

    //проверка на валидность
  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

    //обработчик всех полей
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  //обработчик всех форм
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }

  //функция проверки полей на валидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  //функция состояния кнопки
  _disabledButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  };

  _enabledButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this._disabledButton(buttonElement);
    } else {
      this._enabledButton(buttonElement);
    }
  };
}