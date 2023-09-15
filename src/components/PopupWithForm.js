import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handelFormSubmit) {
    super(selectorPopup);
    this.form = this.selectorPopup.querySelector('.popup__form');
    this.inputs = this.form.querySelectorAll('.popup__input');
    this._buttonSubmitElement = this.selectorPopup.querySelector('.popup__container-submit');
    this._handelFormSubmit = handelFormSubmit;
  };

  _getInputValues() {
    const inputValues = {};
    this.inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  };

  setInputValues(data) {
    this.inputs.forEach((input) => {
      input.value = data[input.name];
    });
  };

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handelFormSubmit(this._getInputValues());
    });
  };

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', () => {
      // evt.preventDefault();
      const initialText = this._buttonSubmitElement.textContent; // перед запросом сохраняем изначальный текст кнопки
      this._buttonSubmitElement.textContent = 'Сохранение...'; // меняем его, чтобы показать пользователю ожидание
      this._handelFormSubmit(this._getInputValues()) // закрывается попап в `then`
      .then(() => this.close()) 
      .finally(() => {
        this._buttonSubmitElement.textContent = initialText; // в любом случае меняется текст кнопки обратно на начальный в `finally`
      }) 
    });
  };

  close() {
    this.form.reset();
    super.close();
  };
}