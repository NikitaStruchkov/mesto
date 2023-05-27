export const config = {
  formSelector: '.popup__content',
  inputSelector: '.popup__text-area',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text-area_invalid',
  errorClass: 'popup__error-text'
}

export class FormValidator {
  constructor (config, formElement) {
    this._formSelector = config.formSelector // '.popup__content',
    this._inputSelector = config.inputSelector // '.popup__text-area',
    this._submitButtonSelector = config.submitButtonSelector // '.popup__save',
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._formElement = formElement // элемент той формы, которая валидируется
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    )
  }

  _setInputValidState (inputElement, errorElement) {
    // метод, который стирает у input класс c _invalid
    inputElement.classList.remove(this._inputErrorClass) // valid
    errorElement.textContent = '' // удялает содержимое span
  }

  _setInputInvalidState (inputElement, errorElement) {
    // метод, который добавляет  input класс c _invalid
    inputElement.classList.add(this._inputErrorClass) // invalid
    errorElement.textContent = inputElement.validationMessage //  использует стандартные браузерные тексты ошибок
  }

  _checkInputValidity (inputElement) {
    // метод, который проверяет валидность инпутов
    const errorElement = this._formElement.querySelector(
      `#error-${inputElement.id}`
    ) // элемент ошибки
    if (inputElement.checkValidity()) {
      // метод checkValidity() возвращает логическое значение
      this._setInputValidState(inputElement, errorElement)
    } else {
      this._setInputInvalidState(inputElement, errorElement)
    }
  }

  toggleButtonValidity () {
    // метод, который меняет отображение кнопки submit
    if (this._formElement.checkValidity()) {
      // если форма валидная
      this._enableButton(this._submitButton) // включает кнопку
    } else {
      this._disableButton(this._submitButton)
    }
  }

  _disableButton () {
    // метод неактивной кнопки
    this._submitButton.classList.add(this._inactiveButtonClass) // добавляет класс с _disabled   -- 'popup__save_disabled'
    this._submitButton.setAttribute('disabled', true) // блокирует отправку
  }

  _enableButton () {
    // метод активной кнопки
    this._submitButton.removeAttribute('disabled') // убирает класс с _disabled
    this._submitButton.classList.remove(this._inactiveButtonClass) // активирует кнопку -- 'popup__save_disabled'
  }

  _setEventListeners () {
    // метод, который реагирует на событие 'input'
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    )
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this.toggleButtonValidity() // деактивиует кнопку сабмита, если импуты не были отредактированы
      })
    })
  }

  enableValidation () {
    // публичный метод
    // включение валидации форм
    this._formElement.addEventListener('submit', event => {
      event.preventDefault() // отменяет стандартную отправку формы.
      this.toggleButtonValidity() // деактивиует кнопку сабмита после очередного добавления новой карточки
    })

    this._setEventListeners()
  }
}
