import { initialCards } from './cards.js'
import Card from './Card.js'
import { FormValidator, config } from './FormValidator.js'

const editButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const editPopup = document.querySelector('.popup_type_edit-form')
const editPopupTitle = editPopup.querySelector('.popup__text-area_input_name')
const editPopupSubtitle = editPopup.querySelector('.popup__text-area_input_job')
const editPopupForm = editPopup.querySelector('.popup__content_type_edit')
const cardSection = document.querySelector('.elements')
const imgPopup = document.querySelector('.popup_type_full-img')
const fullImagePopup = imgPopup.querySelector('.popup__image')
const descriptionImgPopup = imgPopup.querySelector('.popup__description')

// ---------------------- Функции открытия/закрытия попапов -------------------

const openPopup = popup => {
  // функция, которая открывает popup-ы
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByPressingEsc) // добавляет слушатель закрытия попапа нажатием на Esc
}

const closePopup = popup => {
  // функция, которая закрывает popup-ы
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByPressingEsc) // удялет слушатель закрытия попапа нажатием на Esc
}

// ----------------------  Закрытие попапа кликом на оверлей -------------------

const popups = document.querySelectorAll('.popup') // все попапы
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

function closePopupByPressingEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') // находит открытый попап
    closePopup(openedPopup) // закрывает попап с помощью функции closePopup
  }
}

// ------------------------- Открытие попапа с картинкой ------------------

export const openZoomedCardPhoto = (name, link) => {
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
})

// ---------------------- Добавление новой карточкии -------------------

const renderNewCardElement = (cardSection, cardData) => {
  // функция добавления новой карточки на страницу
  const card = new Card(
    cardData,
    '.card-template',
    '.card-template_type_default',
    openZoomedCardPhoto
  ) // создает экземпляр карточки
  const cardElement = card.generateCard() // возвращает карточку на страницу с помощью generateCard
  cardSection.prepend(cardElement)
}

initialCards.forEach(cardData => {
  // карточки из массива initialCards
  renderNewCardElement(cardSection, cardData)
})

function handleCardSubmit (event) {
  // наполнение карточки данными
  event.preventDefault() // Эта строчка отменяет стандартную отправку формыы
  const name = nameInput.value
  const link = urlInput.value
  closePopup(addPopup)

  renderNewCardElement(cardSection, { name, link })
  addPopupForm.reset()
}

addPopupForm.addEventListener('submit', handleCardSubmit)

// ------------------------------ валидация -----------------------------------------

const editPopupFormValidator = new FormValidator(config, editPopupForm) // экземпляр класса
const addPopupFormValidator = new FormValidator(config, addPopupForm) // экземпляр класса

editPopupFormValidator.enableValidation(config)
addPopupFormValidator.enableValidation(config)

// ---------------------- export -------------------
export { editPopupForm }
