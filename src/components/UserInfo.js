export default class UserInfo {
  // Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
  constructor ({ name, about, avatar }) {
    this._name = name // Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    this._about = about
    this._avatar = document.querySelector('.profile__avatar') 
  }

  getUserInfo () {
    const userInfoData = {
      name: this._name.textContent,
      about: this._about.textContent
    }
    return userInfoData
  }

  setUserInfo ({ name, about }) {
    this._name.textContent = name
    this._about.textContent = about
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
