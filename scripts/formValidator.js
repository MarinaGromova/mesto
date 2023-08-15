export default class FormValidator {
  constructor (validationConfig, formElement) {
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  //функция показывает элемент ошибки
  _showInputError(inputElement) {
    const spanElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    spanElement.textContent = inputElement.validationMessage;
    spanElement.classList.add(this._errorClass);
  };
 
  //функция скрывает элемент ошибки
  _hideInputError(inputElement) {
    const spanElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    spanElement.classList.remove(this._errorClass);
    spanElement.textContent = "";
  };

    //проверка на валидность
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

    //обработчик всех полей
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  //обработчик всех форм
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  //функция проверки сразу всех полей на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  };

  //метод очистки полей от ошибки
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //функция состояния кнопки
  _disabledButton(buttonElement) {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enabledButton(buttonElement) {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disabledButton();
    } else {
      this._enabledButton();
    }
  };
}