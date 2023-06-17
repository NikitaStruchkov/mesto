import Popup from './Popup.js'
// класс попапа с подтверждением
export default class PopupConfirmation extends Popup {
  // Получает селектор, объект и карточку.
  constructor ({ popupSelector, agreementSubmit }) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector('.popup__content')
    this._agreementSubmit = agreementSubmit
  }

  open (cardData, cardId) {
    // получает данные
    this._cardData = cardData
    this._cardId = cardId
    super.open()
  }
  // метод собержит обработчик события нажатия на кнопку сабмита
  setEventListeners () {
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault()
      this._agreementSubmit(this._cardData, this._cardId)
    })
    super.setEventListeners()
  }
}
