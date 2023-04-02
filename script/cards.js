const initialCards = [  // начальный массив карточек
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const cardTemplate = document.getElementById('card-template');
const cardSection = document.querySelector('.elements');  // сюда функция renderCardElement будет вставлять карточку
console.log(cardTemplate);
console.log(cardSection);

// создаем функцию котор на осн данных создает элемент
const createCardElement = (cardData) => {      // Создать элемент карточки
  // cardData это объект с данными о карточке
const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
console.log(cardElement);
const cardName = cardElement.querySelector('.element__name');
const cardPhoto = cardElement.querySelector('.element__photo');

cardName.textContent = cardData.name;
cardPhoto.src = cardData.link;
cardPhoto.alt = cardData.name;

return cardElement;
}

const renderCardElement = (cardElement) => {  // добавление карточки в дерево
cardSection.prepend(cardElement);
};

initialCards.forEach((card) => {      // итерация по массиву карточек
  renderCardElement(createCardElement(card));
});
