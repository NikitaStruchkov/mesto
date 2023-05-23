import { initialCards } from './cards.js'
import Card from './Card.js'
import { FormValidator, config } from './FormValidator.js'
import Section from './Section.js'
import Popup from './Popup.js'
// import PopupWithForm from './PopupWithForm.js'  
// import PopupWithImage from './PopupWithImage.js'
import UserInfo from './UserInfo.js'

const editButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const editPopup = document.querySelector('.popup_type_edit-form')
const editPopupTitle = editPopup.querySelector('.popup__text-area_input_name')
const editPopupSubtitle = editPopup.querySelector('.popup__text-area_input_job')
const editPopupForm = editPopup.querySelector('.popup__content_type_edit')
const cardSection = document.querySelector('.elements')
const imgPopup = document.querySelector('.popup_type_full-img')
const fullImagePopup = imgPopup.querySelector('.popup__image') // УДАЛИТЬ
const descriptionImgPopup = imgPopup.querySelector('.popup__description') // УДАЛИТЬ

// ---------------------- Функции открытия/закрытия попапов -------------------

const openPopup = popup => { // УДАЛИТЬ
  // функция, которая открывает popup-ы
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByPressingEsc) // добавляет слушатель закрытия попапа нажатием на Esc
}

const closePopup = popup => { // УДАЛИТЬ
  // функция, которая закрывает popup-ы
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByPressingEsc) // удялет слушатель закрытия попапа нажатием на Esc
}

// ----------------------  Закрытие попапа кликом на оверлей -------------------

const popups = document.querySelectorAll('.popup') // все попапы  // УДАЛИТЬ
// объединияем  обработчики оверлея и крестиков:
popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      // Метод contains позволяет проверить, содержит ли один элемент внутри себя другой.
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

// ----------------------  Закрытие попапа нажатием на Esc -------------------

function closePopupByPressingEsc (evt) { // УДАЛИТЬ
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') // находит открытый попап
    closePopup(openedPopup) // закрывает попап с помощью функции closePopup
  }
}

// ------------------------- Открытие попапа с картинкой ------------------

function handleCardClick (name, link) {  // УДАЛИТЬ
  openPopup(imgPopup)
  descriptionImgPopup.textContent = name
  fullImagePopup.src = link
  fullImagePopup.alt = name
}



// ---------------------- Форма редактирования профиля -------------------

editButton.addEventListener('click', () => {
  openPopup(editPopup)
  editPopupTitle.value = profileTitle.textContent // значение поля по умолчанию
  editPopupSubtitle.value = profileSubtitle.textContent //значение поля по умолчанию
  // editPopupForm.reset()
})

function handleEditProfileFormSubmit (event) {
  event.preventDefault() // Эта строчка отменяет стандартную отправку формы.
  const name = editPopupTitle.value
  const job = editPopupSubtitle.value

  profileTitle.textContent = name // меняем имя в профиле
  profileSubtitle.textContent = job
  closePopup(editPopup) // закрываем попап сразу после submit-а
}

editPopupForm.addEventListener('submit', handleEditProfileFormSubmit) // добавим обработчик submit-а

// ---------------------- Форма добавления карточки -------------------

const addButton = document.querySelector('.profile__add-button')
const addPopup = document.querySelector('.popup_type_add-form')
const addPopupForm = addPopup.querySelector('.popup__content_type_add')
const nameInput = addPopupForm.querySelector('.popup__text-area_card_name')
const urlInput = addPopupForm.querySelector('.popup__text-area_card_url')

addButton.addEventListener('click', () => {
  openPopup(addPopup)
  addPopupForm.reset()
})

// ---------------------- Добавление новой карточкии -------------------
// Для создания новой карточки нужно сделать отдельную функцию createCard ,
// чтобы разделить логику вставки: она будет возвращать готовую карточку с уже установленными обработчиками через return, а вставлять в DOM там не нужно.

function createCard (cardData) {
  const cardItem = new Card(cardData, '#card-template', handleCardClick)
  renderCard(cardItem.generateCard())
  return cardItem
}

function renderCard (cardItem) {
  // Функция отрисовки карточки на странице
  cardSection.prepend(cardItem) // cardSection - '.elements'
}
//-----------------------------------------------------------------------

function handleCardSubmit (event) {
  // наполнение карточки данными
  event.preventDefault() // Эта строчка отменяет стандартную отправку формыы
  const cardData = {
    name: nameInput.value,
    link: urlInput.value
  }
  createCard(cardData)
  addPopupForm.reset()
  closePopup(addPopup)
}

addPopupForm.addEventListener('submit', handleCardSubmit)

// initialCards.forEach(createCard)  // УДАЛИТЬ!

// ------------------------------ валидация -----------------------------------------

const editPopupFormValidator = new FormValidator(config, editPopupForm) // экземпляр класса
const addPopupFormValidator = new FormValidator(config, addPopupForm) // экземпляр класса

editPopupFormValidator.enableValidation(config)
addPopupFormValidator.enableValidation(config)


// -------------------------------- new class ------------------------------------

const section = new Section({items: initialCards, renderer: createCard}, '.elements')
section.renderItems()

//----------------------------------------------------------------------------------

// const editPopupFormclass = new PopupWithForm({
//   popupSelector: '.popup_type_edit-form', 
//   handleFormSubmit: (event) => {
//     event.preventDefault() // Эта строчка отменяет стандартную отправку формы.
//     const name = editPopupTitle.value
//     const job = editPopupSubtitle.value

//     profileTitle.textContent = name // меняем имя в профиле
//     profileSubtitle.textContent = job
//     // closePopup(editPopup) // закрываем попап сразу после submit-а
//   }
// })

// ---------------------- export -------------------
export { editPopupForm }
