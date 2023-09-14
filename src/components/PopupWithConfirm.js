import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(selectorPopup, handleDeleteCard) {
    super(selectorPopup);
    this._handleDeleteCard = handleDeleteCard;
    this._form = this.selectorPopup.querySelector('.popup__form_type_delete');
  };

  open(card) {
    super.open()
    this.card = card
  };

  setAction(func) {
    this._handleDeleteCard = func;
  };
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleDeleteCard()
    });
  };
}