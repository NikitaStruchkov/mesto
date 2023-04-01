const editButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editPopup = document.querySelector('.popup');
const editPopupCloseButton = editPopup.querySelector('.popup__close');
const editPopupTitle = editPopup.querySelector('.popup__text-area_input_name');
const editPopupSubtitle = editPopup.querySelector('.popup__text-area_input_job');
const editPopupForm = editPopup.querySelector('.popup__content');

function popupOpened() {
  editPopupTitle.value = profileTitle.textContent; // значение поля по умолчанию
  editPopupSubtitle.value = profileSubtitle.textContent; //значение поля по умолчанию
  editPopup.classList.add('popup_opened');
}

editButton.addEventListener('click', popupOpened); //вызываем ранее объявленую функцию

function popupClosed() {
  editPopup.classList.remove('popup_opened');
}

editPopupCloseButton.addEventListener('click', popupClosed); //вызываем ранее объявленую функцию

function handleFormSubmit(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = editPopupTitle.value;
  const job = editPopupSubtitle.value;

  profileTitle.textContent = name; // меняем имя в профиле
  profileSubtitle.textContent = job;
  editPopup.classList.remove('popup_opened'); // закрываем попап сразу после submit-а
}

// добавим обработчик submit-а
editPopupForm.addEventListener('submit', handleFormSubmit); //вызываем ранее объявленую функцию

