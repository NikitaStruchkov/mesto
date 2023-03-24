const editButton = document.querySelector(".profile__edit-button");
const ProfileTitle = document.querySelector(".profile__title");
const ProfileSubtitle = document.querySelector(".profile__subtitle");
const editPopup = document.querySelector(".popup");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const editPopupTitle = editPopup.querySelector(".popup__title");
const editPopupSubtitle = editPopup.querySelector(".popup__subtitle");
const editPopupSave = editPopup.querySelector(".popup__save"); // для кнопки сохранить
const editPopupForm = editPopup.querySelector(".popup__content");

editButton.addEventListener("click", function () {
  console.log("click");
  editPopupTitle.value = ProfileTitle.innerHTML; // значение поля по умолчанию
  editPopupSubtitle.value = ProfileSubtitle.innerHTML; //значение поля по умолчанию

  editPopup.classList.add("popup_opened");
});

editPopupCloseButton.addEventListener("click", function () {
  editPopup.classList.remove("popup_opened");
});

// добавим обработчик submit-а
editPopupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = editPopupTitle.value;
  const job = editPopupSubtitle.value;

  ProfileTitle.innerHTML = name; // меняем имя в профиле
  ProfileSubtitle.innerHTML = job;
  editPopup.classList.remove("popup_opened"); // закрываем попап сразу после submit-а
});
