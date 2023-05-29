import { initialCards } from '../utils/cards.js'
import Card from '../components/Card.js'
import { FormValidator, config } from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

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
  // editPopupForm.reset()
})

// ---------------------- Форма добавления карточки -------------------

addButton.addEventListener('click', () => {
  addPopupWithForm.open()
  addPopupForm.reset()
})

// ---------------------- Добавление новой карточкии -------------------

function createCard (cardData) {
  const cardItem = new Card(cardData, '#card-template', handleCardClick)
  renderCard(cardItem.generateCard())
  return cardItem
}

function renderCard (cardItem) {
  // Функция отрисовки карточки на странице
  cardSection.prepend(cardItem) // cardSection - '.elements'
}

// -------------------------------- new Section ------------------------------------

const section = new Section(
  { items: initialCards, renderer: createCard },
  '.elements'
)
section.renderItems()

//------------------------------- new PopupWithImage ---------------------------------

const popupWithImage = new PopupWithImage('.popup_type_full-img')
popupWithImage.setEventListeners()

// ------------------------------ new PopupWithForm ----------------------------------

const editPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_edit-form',
  handleFormSubmit: (formData) => {
    formData.name = editPopupTitle.value
    formData.job = editPopupSubtitle.value
    userInfo.setUserInfo(formData.name, formData.job)
    editPopupWithForm.close() // закрываем попап сразу после submit-а
  }
})

editPopupWithForm.setEventListeners()

const addPopupWithForm = new PopupWithForm({
  popupSelector: '.popup_type_add-form',
  handleFormSubmit: (formData) => {
    formData.name = nameInput.value,
    formData.link = urlInput.value,
    createCard(formData)
    addPopupForm.reset()
    addPopupFormValidator.toggleButtonValidity()
    addPopupWithForm.close()
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
