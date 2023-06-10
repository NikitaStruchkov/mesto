// import { initialCards } from '../utils/cards.js'
import Card from '../components/Card.js'
import { FormValidator, config } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

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
const nameInput = addPopupForm.querySelector('.popup__text-area_card_name')
const urlInput = addPopupForm.querySelector('.popup__text-area_card_url')
const avatar = document.querySelector('.profile__avatar')

let userId = null

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '44f88861-7aa4-4c69-b219-337a1c6a7261',
    'Content-Type': 'application/json'
  }
});

// 1. Загрузка информации о пользователе с сервера

api.getUserInfo().then((users) => {
  userId = users._id;
  userInfo.setUserInfo ({name: users.name, about: users.about })
  userInfo.setUserAvatar(users.avatar);
})

// 2. Загрузка карточек с сервера
 api.getInitialCards().then((cards) => {
  const section = new Section(
    { items: cards, renderer: createCard, avatar: avatar },
    '.elements'
  )
  section.renderItems()
  
}).catch((err) => console.log('Ошибка. Запрос не выполнен'));











// ------------------------- Открытие попапа с картинкой ------------------

function handleCardClick (name, link) {
  popupWithImage.open(name, link)
}

// ---------------------- Форма редактирования профиля -------------------

editButton.addEventListener('click', () => {
  editPopupWithForm.open()
  userInfo.getUserInfo()
  editPopupTitle.value =  userInfo.getUserInfo().name //  значение поля по умолчанию
  editPopupSubtitle.value = userInfo.getUserInfo().about //значение поля по умолчанию
})

// ---------------------- Форма добавления карточки -------------------

addButton.addEventListener('click', () => {
  addPopupWithForm.open()
  addPopupForm.reset()
})

// ---------------------- Добавление новой карточкии -------------------

function createCard (cardData) {
  const cardItem = new Card(cardData, '#card-template', handleCardClick, api, userId)
  renderCard(cardItem.generateCard())
  return cardItem
}


function renderCard (cardItem) {
  // Функция отрисовки карточки на странице
  cardSection.prepend(cardItem) // cardSection - '.elements'
}

// -------------------------------- new Section ------------------------------------

// const section = new Section(
//   { items: initialCards, renderer: createCard },
//   '.elements'
// )
// section.renderItems()

//------------------------------- new PopupWithImage ---------------------------------

const popupWithImage = new PopupWithImage('.popup_type_full-img')
popupWithImage.setEventListeners()

// ------------------------------ new PopupWithForm ----------------------------------

const editPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_edit-form',
  handleFormSubmit: (formData) => { 
    api.sendUserInfo(formData).then((res) => {  // 3. Редактирование профиля
      userInfo.setUserInfo({ name: res.name, about: res.about })
      editPopupWithForm.close() // закрываем попап сразу после submit-а
    })
  }
})

editPopupWithForm.setEventListeners()



const addPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_add-form',
  handleFormSubmit: (formData) => {
    api.addNewCard({ name: formData.name, link: formData.link }).then((card) => {  // 4. Добавление новой карточки
      createCard(card)
      addPopupForm.reset()
      addPopupFormValidator.toggleButtonValidity()
      addPopupWithForm.close()
      
    })
  }
})

addPopupWithForm.setEventListeners()

// -------------------------------- new UserInfo ------------------------------------

const userInfo = new UserInfo({
  name: profileTitle,
  about: profileSubtitle
})

// ------------------------------ Валидация форм  -------------------------------------

const editPopupFormValidator = new FormValidator(config, editPopupForm)
const addPopupFormValidator = new FormValidator(config, addPopupForm)

editPopupFormValidator.enableValidation(config)
addPopupFormValidator.enableValidation(config)

// --------------------------------------- export -------------------------------------
export { editPopupForm }
