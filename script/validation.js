//////////////////////////// ВАЛИДАЦИЯ ПОПАПА///////////////////////////////////////

function setInputValidState(config, input, errorElement) {   // Функция, которая удаляет класс с ошибкой
    input.classList.remove(config.inputErrorClass);  // valid
    errorElement.textContent = '';
  }
  function setInputInvalidState(config, input, errorElement) { // Функция, которая добавляет класс с ошибкой
    input.classList.add(config.inputErrorClass);    // invalid
    errorElement.textContent = input.validationMessage;
  }
  
  
  function checkInputValidity(config, form, input) { 
    const errorElement = form.querySelector(`#error-${input.id}`);  // функция проверки валидности инпутов
  
    if (input.checkValidity()) {
      setInputValidState(config, input, errorElement);
    } else {
     setInputInvalidState(config, input, errorElement);
    }
  }
  
  function disableSubmitButton(config, button) {  // функця, которая блокирует кнопку submit при невалидных инпутах 
    button.setAttribute('disabled', '');
    button.classList.add(config.inactiveButtonClass);
  }
  
  function enableSubmitButton(config, button) {  // функця, которая разблокирует кнопку submit когда инпуты валидены 
    button.removeAttribute('disabled');
    button.classList.remove(config.inactiveButtonClass);
    
  }
  
  function toggleButtonValidity(config, form) {  // функця, которая проверяет форму на валидность
    const PopupSaveButton = form.querySelector(config.submitButtonSelector);
   
    
    if (form.checkValidity()) {
      enableSubmitButton(PopupSaveButton);
    } else {
      disableSubmitButton(PopupSaveButton);
    }
  }


  function setEventListeners(config, form) {
    const PopupInputsArray = Array.from(form.querySelectorAll(config.inputSelector)); // массив
    PopupInputsArray.forEach(function (input) {   // функция, которая проверяет валидность при каждом событии 'input'
      input.addEventListener('input', () => {
        checkInputValidity(config, form, input)
        toggleButtonValidity(form);
      });
    })
  }
  
  
  function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);  //псевдомассив
  const formListArray = Array.from(formList);  // массив
  formListArray.forEach(function (form) { 
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      form.reset();
    });
    setEventListeners(config);
  })
  
  }
  
  enableValidation({
    formSelector: '.popup__content',
    inputSelector: '.popup__text-area',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__text-area_invalid',
    errorClass: 'popup__error-text'
  }); 
  
  
