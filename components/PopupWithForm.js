import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handelFormSubmit) {
    super(selectorPopup);
    this.form = this.selectorPopup.querySelector('.popup__form');
    this.inputs = this.form.querySelectorAll('.popup__input');
    this._handelFormSubmit = handelFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this.inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handelFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}