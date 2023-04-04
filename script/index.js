const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const editPopup = document.getElementById("edit-popup");
const editPopupCloseButton = document.getElementById("edit-btn-close");
const editPopupTitle = editPopup.querySelector(".popup__text-area_input_name");
const editPopupSubtitle = editPopup.querySelector(".popup__text-area_input_job");
const editPopupForm = editPopup.querySelector(".popup__content_type_edit");

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
  renderCardElement(createCardElement(cardData));    // еще раз повторить последовательность от и до
  closePopup(addPopup);
}

addPopupForm.addEventListener('submit', handleCardSubmit);
