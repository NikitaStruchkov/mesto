export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._closePopupByPressingEsc = this._closePopupByPressingEsc.bind(this)
  }

  open () {
    // метод отвечают за открытие попапа.
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._closePopupByPressingEsc) // добавляет слушатель закрытия попапа нажатием на Esc
  }

  close () {
    // метод отвечают за закрытие попапа.
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._closePopupByPressingEsc) // удялет слушатель закрытия попапа нажатием на Esc
  }

  _closePopupByPressingEsc (evt) {
    // метод содержит логику закрытия попапа клавишей Esc.
    if (evt.key === 'Escape') {
      this.close() // закрывает попап с помощью функции closePopup
    }
  }

  setEventListeners () {
    // метод добавляет слушатель клика иконке закрытия попапа
    // объединияем  обработчики оверлея и крестиков:
      this._popup.addEventListener('mousedown', evt => {
        if (evt.target.classList.contains('popup_opened')) {
          // Метод contains позволяет проверить, содержит ли один элемент внутри себя другой.
          this.close(this._popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          this.close(this._popup)
        }
      })
  }
}
