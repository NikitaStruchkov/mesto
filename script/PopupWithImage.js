import Popup from "./Popup";

export default class PopupWithImage extends Popup {  // класс наследует от Popup
    constructor(popupSelector, name, link) {
       super(popupSelector);
       this._fullImagePopup = this._popup.querySelector('.popup__image');
       this._descriptionImgPopup = this._popup.querySelector('.popup__description');
       this._name = name;
       this._link = link;
    };

    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupByPressingEsc);
        this._descriptionImgPopup.textContent = this._name;
        this._fullImagePopup.src = this._link;
        this._fullImagePopup.alt = this._name;
    }
}
