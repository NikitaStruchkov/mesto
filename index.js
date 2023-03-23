const editButton = document.querySelector(".profile__edit-button");
const ProfileTitle =document.querySelector(".profile__title")
const editPopup = document.querySelector(".popup");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const editPopupTitle = editPopup.querySelector(".popup__title");
const editPopupSave = editPopup.querySelector(".popup__save"); // для кнопки сохранить
const editPopupForm = editPopup.querySelector(".popup__content");

editButton.addEventListener("click", function () {
  console.log("click");

  editPopup.classList.add("popup_open");
});

editPopupCloseButton.addEventListener("click", function () {
  editPopup.classList.remove("popup_open");
});

// добавим обработчик submit-а
editPopupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = editPopupTitle.value;

  ProfileTitle.innerHTML = name;  // меняем имя в профиле
  editPopup.classList.remove("popup_open");  // закрываем попап сразу после submit-а
});



