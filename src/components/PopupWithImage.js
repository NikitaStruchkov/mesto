import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  // класс наследует от Popup
  constructor (popupSelector) {
    super(popupSelector)
    this._fullImagePopup = this._popup.querySelector('.popup__image')
    this._descriptionImgPopup = this._popup.querySelector('.popup__description')
  }

  open (name, link) {
    super.open()
    this._descriptionImgPopup.textContent = name
    this._fullImagePopup.src = link
    this._fullImagePopup.alt = name
  }
}
