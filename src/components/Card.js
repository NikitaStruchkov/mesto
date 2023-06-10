//  класс Card  создаёт карточку с текстом и ссылкой на изображение
export default class Card {
  constructor (cardData, templateSelector, handleCardClick, api, userId) {
    this._cardData = cardData
    this._name = cardData.name
    this._link = cardData.link
    this._alt = cardData.name
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._id = cardData.id
    this._api = api
    this._userId = userId;
    
  }

  _getTemplate () {
    // метод получает разметку из темплейта
    const newCardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true)

    return newCardElement // возвращает разметку карточки
  }

  generateCard () {
    // метод подготовит карточку к публикации - публичный
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate()
    this._photo = this._element.querySelector('.element__photo')
    this._setEventListeners() // обработчики
    // данные
    this._photo.src = this._link
    this._photo.alt = this._alt
    this._element.querySelector('.element__name').textContent = this._name

    return this._element
  }

  _setEventListeners = () => {
    this._likeButton = this._element.querySelector('.element__like')

    this._element
      .querySelector('.element__delete')
      .addEventListener('click', () => {
        // обработчик события клика по кнопке удалить
        this._deleteCardElement()
      })

    this._likeButton.addEventListener('click', () => {
      // обработчик события клика по кнопке лайка
      this._handleCardLike()
    })

    this._element
      .querySelector('.element__photo')
      .addEventListener('click', () => {
        // обработчик события клика по картинке
        this._handleCardClick(this._name, this._link)
      })
  }

  _deleteCardElement = () => {
    // метод удаления карточки
    this._element.remove()

  }

  _handleCardLike = () => {
    // метод лайка
    if (this._likeButton.classList.contains('element__like_type_active')) {
      // проверяем содержит ли один элемент внутри себя другой
      this._likeButton.classList.remove('element__like_type_active')
    } else this._likeButton.classList.add('element__like_type_active')
  }


  displayLikesQuantity (card) {
    this.likesQuantity = this._templateSelector.querySelector('.element__likes-quantity')
    debugger
    this._likesArray = card.likes;
    if (this._likesArray.length === 0) {
      this.likesQuantity.textContent = '';
    } else {
      // Брать количество лайков из ответа сервера
      this.likesQuantity.textContent = this._likeArea.length;
    }
   this._handleCardLike()
  }
}
