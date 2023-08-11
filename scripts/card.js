import {openPopup, popupCaption,popupZoomImage,popupImage} from './index.js';

export default class Card {
  constructor (data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  };

//отрисовываем новую карточку, находим темплейт
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);
  }

//подготовка к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.elements__img').src = this._link;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._likeButton = this._element.querySelector('.elements__group');
    this._basketButton = this._element.querySelector('.elements__basket');
    this._elementImage = this._element.querySelector('.elements__img');
    this._setEventListeners();
    return this._element;
  };

  //лайки
  _handleLike() {
    this._likeButton.classList.toggle('elements__group_active');
  }

  //удаление карточек
  _handleDelete() {
    this._element.remove();
  }

  //зум
  _handleImage() {
    popupCaption.textContent = this._name;
    popupImage.src = this._link;
    popupCaption.alt = this._name;
    openPopup(popupZoomImage);
  }

  //слушатели
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLike());
    this._basketButton.addEventListener('click', () => this._handleDelete());
    this._elementImage.addEventListener('click', () => this._handleImage());
  };  
}