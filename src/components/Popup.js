export default class Popup {
  constructor(selectorPopup) {
    this.selectorPopup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupCloseButton = this.selectorPopup.querySelector(
      '.popup__container-close'
    );
  };

  open() {
    this.selectorPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this.selectorPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this.selectorPopup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });

    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  };
}