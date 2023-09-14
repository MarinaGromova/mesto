export default class Card {
  constructor ({data, userId, templateSelector, handleDelete, handleCardClick, handleSetLike, handleRemoveLike}) {
    this._likes = data.likes;
    this.cardId = data._id;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleLikeCard = data.likes.length;
    this._handleDelete = handleDelete
  };
  
//отрисовываем новую карточку, находим темплейт
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);
  };

//подготовка к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.elements__img');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._likeButton = this._element.querySelector('.elements__group');
    this._basketButton = this._element.querySelector('.elements__basket');
    this._likesNumber = this._element.querySelector('.elements__likes-number');
    this._likesNumber.textContent = this._likes.length;
    if(this._ownerId !== this._userId) {
      this._basketButton.remove()
    }
    if (this._likes.some(like => like._id === this._userId)) {
      this._handleLike()
    }
    this._setEventListeners();
    return this._element;
  };

  //лайки
  _handleClickLike() {
    if (this._likeButton.classList.contains('elements__group_active')) {
      this._handleRemoveLike(this.cardId);
    } else {
      this._handleSetLike(this.cardId);
    }
  };

  _handleLike() {
    this._likeButton.classList.toggle('elements__group_active');
  };

  handleLikeCard(data) {
    this._like = data.likes;
    this._likesNumber.textContent = (this._like).length;
    this._handleLike()
  };

  //удаление карточек
  _handleClickBtnDelete() {
    this._handleDelete(this.cardId)
  };

  remove() {
    this._element.remove();
  };

  //слушатели
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleClickLike(this));
    this._basketButton.addEventListener('click', () => this._handleClickBtnDelete(this.cardId));
    this._elementImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  };  
}