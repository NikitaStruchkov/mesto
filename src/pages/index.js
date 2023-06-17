import Card from '../components/Card.js'
import { FormValidator, config } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupConfirmation from '../components/PopupConfirmation.js'

import '../pages/index.css'

const editButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const editPopup = document.querySelector('.popup_type_edit-form')
const editPopupTitle = editPopup.querySelector('.popup__text-area_input_name')
const editPopupSubtitle = editPopup.querySelector('.popup__text-area_input_job')
const editPopupForm = editPopup.querySelector('.popup__content_type_edit')
const cardSection = document.querySelector('.elements')
const addButton = document.querySelector('.profile__add-button')
const addPopup = document.querySelector('.popup_type_add-form')
const addPopupForm = addPopup.querySelector('.popup__content_type_add')
const avatarPopupForm = document.querySelector(
  '.popup__content_type_avatar-change'
)
const avatar = document.querySelector('.profile__avatar')
const changeAvatarButton = document.querySelector(
  '.profile__change-avatar-icon'
)

let userId = null

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '44f88861-7aa4-4c69-b219-337a1c6a7261',
    'Content-Type': 'application/json'
  }
})

// 1. Загрузка информации о пользователе с сервера
api.getUserInfo().then(users => {
  userId = users._id
  userInfo.setUserInfo({ name: users.name, about: users.about })
  userInfo.setUserAvatar(users)
})

// 2. Загрузка карточек с сервера
api
  .getInitialCards()
  .then(cards => {
    const section = new Section(
      {
        items: cards,
        renderer: card =>
          createCard({
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner,
            cardId: card._id
          })
      },
      '.elements'
    )

    section.renderItems()
  })
  .catch(err => console.log(`Ошибка.....: ${err}`))

// ---------------------- Форма редактирования профиля -------------------

editButton.addEventListener('click', () => {
  editPopupWithForm.open()
  userInfo.getUserInfo()
  editPopupTitle.value = userInfo.getUserInfo().name //  значение поля по умолчанию
  editPopupSubtitle.value = userInfo.getUserInfo().about //значение поля по умолчанию
})

// ---------------------- Форма добавления карточки -------------------

addButton.addEventListener('click', () => {
  addPopupWithForm.open()
  addPopupForm.reset()
})

// ---------------------- Форма изменения аватара ---------------------

changeAvatarButton.addEventListener('click', () => {
  popupChangeAvatarForm.open()
})
// ---------------------- Добавление новой карточки -------------------

function createCard (cardData) {
  const cardItem = new Card({
    data: cardData,
    templateSelector: '#card-template',
    userId,
    handleCardClick: () => {
      popupWithImage.open(cardData.name, cardData.link)
    },
    handleDeleteCard: cardId => {
      popupConfirmation.open(cardItem, cardId)
    },
    handleLikeClick: cardId => {
      if (cardItem.isLiked()) {
        api
          .deleteCardLike(cardId)
          .then(res => cardItem.setLikes(res.likes))
          .catch(err => console.log(`Ошибка.....: ${err}`))
      } else {
        api
          .putCardLike(cardId)
          .then(res => cardItem.setLikes(res.likes))
          .catch(err => console.log(`Ошибка.....: ${err}`))
      }
    }
  })
  renderCard(cardItem.generateCard())
  return cardItem
}

function renderCard (cardItem) {
  // Функция отрисовки карточки на странице
  cardSection.prepend(cardItem) // cardSection - '.elements'
}

//------------------------------- new PopupWithImage ---------------------------------

const popupWithImage = new PopupWithImage('.popup_type_full-img')
popupWithImage.setEventListeners()

// ------------------------------ new PopupWithForm ----------------------------------

const editPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_edit-form',
  handleFormSubmit: formData => {
    api
      .sendUserInfo(formData)
      .then(res => {
        // 3. Редактирование профиля
        userInfo.setUserInfo({ name: res.name, about: res.about })
        editPopupWithForm.changeButtonText('Сохранение...')
        editPopupWithForm.close() // закрываем попап сразу после submit-а
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
      .finally(() => {
        popupChangeAvatarForm.changeButtonText('Сохранить')
      })
  }
})

editPopupWithForm.setEventListeners()

const addPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_add-form',
  handleFormSubmit: formData => {
    api
      .addNewCard({ name: formData.name, link: formData.link })
      .then(res => {
        // 4. Добавление новой карточки
        createCard({
          name: res.name,
          link: res.link,
          likes: res.likes,
          owner: res.owner,
          cardId: res._id
        })
        addPopupForm.reset()
        addPopupFormValidator.toggleButtonValidity()
        addPopupWithForm.changeButtonText('Сохранение...')
        addPopupWithForm.close()
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
      .finally(() => {
        popupChangeAvatarForm.changeButtonText('Создать')
      })
  }
})

addPopupWithForm.setEventListeners()

// 6. Попап удаления карточки

const popupConfirmation = new PopupConfirmation({
  popupSelector: '.popup_type_question-delete',
  agreementSubmit: (cardItem, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardItem.deleteCardElement()
        popupConfirmation.close()
      })
      .catch(err => {
        console.log(`Ошибка.....: ${err}`)
      })
  }
})
popupConfirmation.setEventListeners()

// 9. Обновление аватара пользователя

const popupChangeAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_avatar-change',
  handleFormSubmit: formData => {
    popupChangeAvatarForm.changeButtonText('Сохранение...')
    api
      .changeAvatar(formData.avatarUrl)
      .then(res => {
        userInfo.setUserAvatar(res)
        popupChangeAvatarForm.close()
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
      .finally(() => {
        popupChangeAvatarForm.changeButtonText('Сохранить')
      })
  }
})
popupChangeAvatarForm.setEventListeners()

// -------------------------------- new UserInfo ------------------------------------

const userInfo = new UserInfo({
  name: profileTitle,
  about: profileSubtitle,
  avatar: avatar
})

// ------------------------------ Валидация форм  -------------------------------------

const editPopupFormValidator = new FormValidator(config, editPopupForm)
const addPopupFormValidator = new FormValidator(config, addPopupForm)
const changeAvatarValidator = new FormValidator(config, avatarPopupForm)

editPopupFormValidator.enableValidation(config)
addPopupFormValidator.enableValidation(config)
changeAvatarValidator.enableValidation(config)

// --------------------------------------- export -------------------------------------
export { editPopupForm }
