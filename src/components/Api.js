export default class Api {
  constructor (config) {
    this._url = config.url
    this._headers = config.headers
    this._authorization = config.headers.authorization // token
  }

  _getResponseData (res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }
  getUserInfo () {
    // 1. Загрузка информации о пользователе с сервера
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._getResponseData(res))
  }

  getInitialCards () {
    // 2. Загрузка карточек с сервера
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._getResponseData(res))
  }

  sendUserInfo (profileData) {
    // 3. Редактирование профиля
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: profileData['profile-name'],
        about: profileData['profile-job']
      })
    }).then(res => this._getResponseData(res))
  }

  addNewCard ({ name, link }) {
    // 4. Добавление новой карточки
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    }).then(res => this._getResponseData(res))
  }

  deleteCard (cardId) {
    // 7. Удаление карточки
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._getResponseData(res))
  }

  // Метод отправки лайка на сервер
  putCardLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._getResponseData(res))
  }
  // Метод удаления лайка с сервера
  deleteCardLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    }).then(res => this._getResponseData(res))
  }

  changeAvatar (avatarUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarUrl
      })
    }).then(res => this._getResponseData(res))
  }
}
