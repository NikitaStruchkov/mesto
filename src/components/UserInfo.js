export default class UserInfo {
  // Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
  constructor ({ name, about }) {
    this._name = name
    this._about = about // Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  }

  getUserInfo () {
    const userInfoData = {
      name: this._name.textContent,
      about: this._about.textContent
    }
    return userInfoData
  }

  setUserInfo (name, about) {
    this._name.textContent = name
    this._about.textContent = about
  }
}
