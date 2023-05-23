export default class UserInfo {  // Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
    constructor({profileTitle, profileSubtitle}) { 
        this._profileTitle = profileTitle;
        this._profileSubtitle = profileSubtitle; // Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
        this._editPopupTitle = this._popup.querySelector('.popup__text-area_input_name')
        this._editPopupSubtitle = this._popup.querySelector('.popup__text-area_input_job')

    }

    getUserInfo() {
        return   {
            name: this._editPopupTitle.value,
            job: this._editPopupSubtitle.value
        }
    }

    setUserInfo() {
        profileTitle.textContent = name // меняем имя в профиле
        profileSubtitle.textContent = job
    }
}
