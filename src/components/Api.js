export default class Api {
  constructor (config) {
    this._url = config.url
    this._headers = config.headers
    this._authorization = config.headers.authorization // token
  }

  getUserInfo () {  // 1. Загрузка информации о пользователе с сервера
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    }).then(res => {
      if (res.ok) {
        return res.json() // Метод json читает ответ от сервера в формате json и возвращает промис. Из этого промиса потом можно доставать нужные нам данные.
      } else return Promise.reject(`Ошибка: ${res.status}`) // если ошибка, отклоняем промис
    }).catch((err) => console.log('Ошибка. Запрос не выполнен'));
  }

  getInitialCards () {  // 2. Загрузка карточек с сервера
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    }).then(res => {
      if (res.ok) {
        return res.json() // Метод json читает ответ от сервера в формате json и возвращает промис. Из этого промиса потом можно доставать нужные нам данные.
      } else return Promise.reject(`Ошибка: ${res.status}`) // если ошибка, отклоняем промис
    }).catch((err) => console.log('Ошибка. Запрос не выполнен'));
  }


  sendUserInfo (profileData) {  // 3. Редактирование профиля
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: profileData['profile-name'], about: profileData['profile-job'] })
    }).then(res => {
      if (res.ok) {
        return res.json() // Метод json читает ответ от сервера в формате json и возвращает промис. Из этого промиса потом можно доставать нужные нам данные.
      } else return Promise.reject(`Ошибка: ${res.status}`) // если ошибка, отклоняем промис
    }).catch((err) => console.log('Ошибка. Запрос не выполнен'));
  }



  addNewCard ({ name, link}) {  // 4. Добавление новой карточки
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    }).then(res => {
      if (res.ok) {
        return res.json() // Метод json читает ответ от сервера в формате json и возвращает промис. Из этого промиса потом можно доставать нужные нам данные.
      } else return Promise.reject(`Ошибка: ${res.status}`) // если ошибка, отклоняем промис
    }).catch((err) => console.log('Ошибка. Запрос не выполнен'));
  }







  // getAppInfo() {
  //   return Promise.all([this.getInitialCards(), this.getUserInfo()]); // передаю массив промисов. Первыми - карточки, вторым запрос к информации о пользователе
  // }

  // deleteCard(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: '44f88861-7aa4-4c69-b219-337a1c6a7261'
  //     }
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();  // Метод json читает ответ от сервера в формате json и возвращает промис. Из этого промиса потом можно доставать нужные нам данные.
  //       } else return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис

  //     })
  //     .catch((err) => console.log('Ошибка. Запрос не выполнен'));
  // }
}
