import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this.selectorPopup.querySelector('.popup__image');
    this._cardName = this.selectorPopup.querySelector('.popup__caption');
  }

open(name, link){
  super.open();
  this._cardName.textContent = name;
  this._image.src = link;
  this._image.alt = name;
} 
}