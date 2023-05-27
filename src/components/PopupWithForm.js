import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor ({ popupSelector, handleFormSubmit }) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popupForm = this._popup.querySelector('.popup__content')
  }

  _getInputValues () {
    // собирает данные всех полей формы.
    // достаём все элементы полей
    this._inputList = this._popup.querySelectorAll('.popup__text-area')
    return this._inputList.forEach(inputElement => inputElement.value)
  }

  setEventListeners () {
    //  метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    super.setEventListeners()
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault()
      // добавим вызов функции _handleFormSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleFormSubmit(this._getInputValues())
    })
  }

  closePopup () {
    // метод отвечают за закрытие попапа.
    super.closePopup()
    this._popupForm.reset() // при закрытии попапа форма должна  сбрасываться.
  }
}
