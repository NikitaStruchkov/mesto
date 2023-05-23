import Popup from "./Popup";

 class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__content');
    }

    _getInputValues() {  // собирает данные всех полей формы.
        // достаём все элементы полей
        this._inputList = this._element.querySelectorAll('.popup__text-area');
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;
      }
    
   

    setEventListeners() {  //  Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
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

        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            this._handleFormSubmit(this._getInputValues());
        
            this._element.reset();
          });
    
       }

    closePopup() {  // метод отвечают за закрытие попапа.
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupByPressingEsc) // удялет слушатель закрытия попапа нажатием на Esc
        this._popupForm.reset();  // при закрытии попапа форма должна  сбрасываться.
    }
}
 

