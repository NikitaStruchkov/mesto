import { initialCards } from './cards.js';

const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const editPopup = document.getElementById("edit-popup");
const editPopupCloseButton = document.getElementById("edit-btn-close");
const editPopupTitle = editPopup.querySelector(".popup__text-area_input_name");
const editPopupSubtitle = editPopup.querySelector(".popup__text-area_input_job");
const editPopupForm = editPopup.querySelector(".popup__content_type_edit");
const cardTemplate = document.getElementById("card-template");
const cardSection = document.querySelector(".elements"); // сюда функция renderCardElement будет вставлять карточку


// создаем функцию котор на осн данных создает элемент
const createCardElement = (cardData) => {
  // Создать элемент карточки
  // cardData это объект с данными о карточке
  const cardElement = cardTemplate.content
    .querySelector(".element")
    .cloneNode(true);
  console.log(cardElement);
  const cardName = cardElement.querySelector(".element__name");
  const cardPhoto = cardElement.querySelector(".element__photo");

  cardName.textContent = cardData.name;
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;

  const likeButton = cardElement.querySelector(".element__like"); // Лайк карточки
  const deleteButton = cardElement.querySelector(".element__delete"); // Удаление карточки

  const handleLike = () => {
    // функция лайка
    likeButton.classList.add("element__like_type_active");
  };

  likeButton.addEventListener("click", handleLike); // добавляю модификатор active при нажатии на лайк

  const handleDelete = () => {
    // функция удаления карточки
    cardElement.remove(); // удаляет элемент из дерева
  };

  deleteButton.addEventListener("click", handleDelete);

// ------------------------- Открытие попапа с картинкой  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const imgPopup = document.getElementById('img-popup');
  const imgPopupCloseButton = document.getElementById("img-btn-close");
  const fullImagePopup = imgPopup.querySelector('.popup__image');
  const descriptionPopup = imgPopup.querySelector('.popup__description');

  cardPhoto.addEventListener("click", () => {
    openPopup(imgPopup);
    descriptionPopup.textContent = cardData.name;
    fullImagePopup.src = cardData.link;
    fullImagePopup.alt = cardData.name;
  });

  imgPopupCloseButton.addEventListener("click", () => {
    closePopup(imgPopup);
  });


  return cardElement;
};

const renderCardElement = (cardElement) => {
  // добавление карточки в дерево
  cardSection.prepend(cardElement);
};

initialCards.forEach((card) => {
  // итерация по массиву карточек
  renderCardElement(createCardElement(card));
});



const openPopup = (popup) => {
  // функция, которая открывает popup-ы
  popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
  // функция, которая закрывает popup-ы
  popup.classList.remove("popup_opened");
};

editButton.addEventListener("click", () => {
  openPopup(editPopup);
  editPopupTitle.value = profileTitle.textContent; // значение поля по умолчанию
  editPopupSubtitle.value = profileSubtitle.textContent; //значение поля по умолчанию
});

editPopupCloseButton.addEventListener("click", () => {
  closePopup(editPopup);
});

function handleFormSubmit(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = editPopupTitle.value;
  const job = editPopupSubtitle.value;

  profileTitle.textContent = name; // меняем имя в профиле
  profileSubtitle.textContent = job;
  editPopup.classList.remove("popup_opened"); // закрываем попап сразу после submit-а
}

// добавим обработчик submit-а
editPopupForm.addEventListener("submit", handleFormSubmit); //вызываем ранее объявленую функцию

// --------------------------- Форма добавления карточки

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.getElementById("add-popup");
const addPopupCloseButton = document.getElementById("add-btn-close");

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

addPopupCloseButton.addEventListener("click", () => {
  closePopup(addPopup);
});


// --------------------------- Добавление карточки
const addPopupForm = addPopup.querySelector(".popup__content_type_add");

const handleCardSubmit = (event) => {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const nameInput = addPopupForm.querySelector('.popup__text-area_card_name');
  const urlInput = addPopupForm.querySelector('.popup__text-area_card_url');

  const name = nameInput.value;
  const link = urlInput.value;

  const cardData = {
    name,
    link
  };
  renderCardElement(createCardElement(cardData));
  closePopup(addPopup);
}

addPopupForm.addEventListener('submit', handleCardSubmit);







