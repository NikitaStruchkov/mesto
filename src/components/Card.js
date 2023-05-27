//  класс Card  создаёт карточку с текстом и ссылкой на изображение
export default class Card {
  constructor (cardData, templateSelector, handleCardClick) {
    this._cardData = cardData
    this._name = cardData.name
    this._link = cardData.link
    this._alt = cardData.name
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
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
    this._setEventListeners() // обработчики
    // данные
    this._element.querySelector('.element__photo').src = this._link
    this._element.querySelector('.element__photo').alt = this._alt
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
}
