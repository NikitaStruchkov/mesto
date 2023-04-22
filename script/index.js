import { initialCards } from './cards.js'

const editButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const editPopup = document.querySelector('.popup_type_edit-form')
const editPopupTitle = editPopup.querySelector('.popup__text-area_input_name')
const editPopupSubtitle = editPopup.querySelector('.popup__text-area_input_job')
const editPopupForm = editPopup.querySelector('.popup__content_type_edit')
const cardTemplate = document.getElementById('card-template')
const cardSection = document.querySelector('.elements') // сюда функция renderCardElement будет вставлять карточку
const card = cardTemplate.content.querySelector('.element')
const imgPopup = document.querySelector('.popup_type_full-img')
const fullImagePopup = imgPopup.querySelector('.popup__image')
const descriptionImgPopup = imgPopup.querySelector('.popup__description')

// создаем функцию, которая на основе данных создает элемент
const createCardElement = cardData => {
  // Создать элемент карточки
  // cardData это объект с данными о карточке
  const cardElement = card.cloneNode(true)
  const cardName = cardElement.querySelector('.element__name')
  const cardPhoto = cardElement.querySelector('.element__photo')
  const likeButton = cardElement.querySelector('.element__like') // Лайк карточки
  const deleteButton = cardElement.querySelector('.element__delete') // Удаление карточки

  cardName.textContent = cardData.name
  cardPhoto.src = cardData.link
  cardPhoto.alt = cardData.name

  const handleCardLike = () => {
    // функция лайка
    if (likeButton.classList.contains('element__like_type_active')) {
      // проверяем содержит ли один элемент внутри себя другой
      likeButton.classList.remove('element__like_type_active')
    } else likeButton.classList.add('element__like_type_active')
  }

  likeButton.addEventListener('click', handleCardLike) // добавляю модификатор active при нажатии на лайк

  const handleCardDelete = () => {
    // функция удаления карточки
    cardElement.remove() // удаляет элемент из дерева
  }

  deleteButton.addEventListener('click', handleCardDelete)

  // ------------------------- Открытие попапа с картинкой ------------------

  cardPhoto.addEventListener('click', () => {
    openPopup(imgPopup)
    descriptionImgPopup.textContent = cardData.name
    fullImagePopup.src = cardData.link
    fullImagePopup.alt = cardData.name
  })

  return cardElement
}

const renderInitialCardElement = cardElement => {
  // добавление карточки в дерево
  cardSection.append(cardElement)
}

initialCards.forEach(card => {
  // итерация по массиву карточек
  renderInitialCardElement(createCardElement(card))
})

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

// ---------------------- 3. Закрытие попапа кликом на оверлей -------------------

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

// ---------------------- 4. Закрытие попапа нажатием на Esc -------------------

function closePopupByPressingEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') // находит открытый попап
    closePopup(openedPopup) // закрывает попап с помощью функции closePopup
  }
}

// -----------------------------------------------------------------------------

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

// добавим обработчик submit-а
editPopupForm.addEventListener('submit', handleEditProfileFormSubmit) //вызываем ранее объявленую функцию

// ---------------------- Форма добавления карточки -------------------
const addButton = document.querySelector('.profile__add-button')
const addPopup = document.querySelector('.popup_type_add-form')

addButton.addEventListener('click', () => {
  openPopup(addPopup)
})

// --------------------------- Добавление карточки ---------------------
const addPopupForm = addPopup.querySelector('.popup__content_type_add')
const nameInput = addPopupForm.querySelector('.popup__text-area_card_name')
const urlInput = addPopupForm.querySelector('.popup__text-area_card_url')

const handleCardSubmit = event => {
  event.preventDefault() // Эта строчка отменяет стандартную отправку формы.
  const name = nameInput.value
  const link = urlInput.value
  const cardData = {
    name,
    link
  }
  const renderNewCardElement = cardElement => {
    // добавление новой карточки в дерево
    cardSection.prepend(cardElement)
  }

  renderNewCardElement(createCardElement(cardData))
  closePopup(addPopup)
}

addPopupForm.addEventListener('submit', handleCardSubmit)

// ---------------------- export -------------------
export { editPopupForm }
