import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor ({ popupSelector, handleFormSubmit }) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popupForm = this._popup.querySelector('.popup__content')
    this._submitButton = this._popup.querySelector('.popup__save')
  }

  _getInputValues () {
    // собирает данные всех полей формы.
    // достаём все элементы полей
    this._inputList = this._popup.querySelectorAll('.popup__text-area')
    // создаём пустой объект
    this._formValues = {}
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
    // возвращаем объект значений
    return this._formValues
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

  changeButtonText (text) {
    // изменеие кнопок сабмита Сохранение
    this._submitButton.textContent = text
  }

  close () {
    // метод отвечают за закрытие попапа.
    super.close()
    this._popupForm.reset() // при закрытии попапа форма должна  сбрасываться.
  }
}
