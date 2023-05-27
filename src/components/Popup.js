export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._popups = document.querySelectorAll('.popup') // все попапы
    this._openedPopup = document.querySelector('.popup_opened') // находит открытый попап
    this._closePopupByPressingEsc = this._closePopupByPressingEsc.bind(this)
  }

  openPopup () {
    // метод отвечают за открытие попапа.
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._closePopupByPressingEsc) // добавляет слушатель закрытия попапа нажатием на Esc
  }

  closePopup () {
    // метод отвечают за закрытие попапа.
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._closePopupByPressingEsc) // удялет слушатель закрытия попапа нажатием на Esc
  }

  _closePopupByPressingEsc (evt) {
    // метод содержит логику закрытия попапа клавишей Esc.
    if (evt.key === 'Escape') {
      this.closePopup(this._openedPopup) // закрывает попап с помощью функции closePopup
    }
  }

  setEventListeners () {
    // метод добавляет слушатель клика иконке закрытия попапа
    // объединияем  обработчики оверлея и крестиков:
    this._popups.forEach(popup => {
      popup.addEventListener('mousedown', evt => {
        if (evt.target.classList.contains('popup_opened')) {
          // Метод contains позволяет проверить, содержит ли один элемент внутри себя другой.
          this.closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          this.closePopup(popup)
        }
      })
    })
  }
}