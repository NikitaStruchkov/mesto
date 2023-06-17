//  класс Card  создаёт карточку с текстом и ссылкой на изображение
export default class Card {
  constructor ({
    data,
    templateSelector,
    userId,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick
  }) {
    this.data = data
    this._name = data.name
    this._link = data.link
    this._alt = data.name
    this._likes = data.likes
    this._templateSelector = templateSelector
    this._ownerId = data.owner._id
    this._cardId = data.cardId
    this._id = data._id
    this._userId = userId
    this._handleCardClick = handleCardClick
    this._handleDeleteCard = handleDeleteCard
    this.handleLikeClick = handleLikeClick
  }

  _getTemplate () {
    // метод получает разметку из темплейта
    const newCardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true)

    return newCardElement // возвращает разметку карточки
  }

  // 7. Удаление карточки
  deleteCardElement () {
    // метод удаления карточки
    this._element.remove()
    this._element = null
  }

  // 8. Постановка и снятие лайка
  isLiked () {
    if (this._likes.find(element => element._id === this._userId)) {
      return true
    }
  }

  setLikes (likesArr) {
    // метод отображения лайков
    this.likeSelector = this._element.querySelector('.element__likes-quantity')
    this._likes = likesArr
    this.likeSelector.textContent = this._likes.length

    if (this.isLiked()) {
      this._likeButton.classList.add('element__like_type_active')
    } else {
      this._likeButton.classList.remove('element__like_type_active')
    }
  }

  generateCard () {
    // метод подготовит карточку к публикации - публичный
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate()
    this._photo = this._element.querySelector('.element__photo')
    this._setEventListeners()
    // обработчики
    // данные
    this._photo.src = this._link
    this._photo.alt = this._alt
    this._element.querySelector('.element__name').textContent = this._name
    this.setLikes(this._likes)
    if (this._userId !== this._ownerId) {
      // иконка удаления только на созданных пользователем карточках
      this._deleteButton.style.display = 'none'
    }
    return this._element
  }

  _setEventListeners = () => {
    this._likeButton = this._element.querySelector('.element__like')
    this._deleteButton = this._element.querySelector('.element__delete')

    this._deleteButton.addEventListener('click', () => {
      // обработчик события клика по кнопке удалить
      this._handleDeleteCard(this._cardId)
    })

    this._likeButton.addEventListener('click', () => {
      // обработчик события клика по кнопке лайка
      this.handleLikeClick(this._cardId)
    })

    this._element
      .querySelector('.element__photo')
      .addEventListener('click', () => {
        // обработчик события клика по картинке
        this._handleCardClick(this._name, this._link)
      })
  }
}
