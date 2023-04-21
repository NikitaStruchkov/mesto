// ----------------------------- Валидация всех форм ----------------------------------

function setInputValidState(config, input, errorElement) { // функция, которая стирает у input класс c _invalid
    input.classList.remove(config.inputErrorClass); // valid
    errorElement.textContent = '';  // удялает содержимое span 
  }
  
  function setInputInvalidState(config, input, errorElement) { // функция, которая добавляет  input класс c _invalid
    input.classList.add(config.inputErrorClass); // invalid
    errorElement.textContent = input.validationMessage; //  использует стандартные браузерные тексты ошибок
  }
  
  function checkInputValidity(config, form, input) {  // функция, которая проверяет валидность инпутов
    const errorElement = form.querySelector(`#error-${input.id}`); // элемент ошибки  
    if (input.checkValidity()) {    // метод checkValidity() возвращает логическое значение
      setInputValidState(config, input, errorElement);
    } else {
      setInputInvalidState(config, input, errorElement);
    }
  }
  

function toggleButtonValidity(config, form) {  // функция, которая меняет отображение кнопки submit 
  const submitButton = form.querySelector(config.submitButtonSelector)    // -- '.popup__save'
      if (form.checkValidity()) {    // если форма валидная 
            enableButton(config, submitButton);  // включает кнопку 
          } else {   
            disableButton(config, submitButton);
          }
    }
    
  
  function disableButton(config, button) {  // функция неактивной кнопки 
    button.classList.add(config.inactiveButtonClass);  // добавляет класс с _disabled   -- 'popup__save_disabled'
    button.setAttribute('disabled', true);  // блокирует отправку 
  }
  
  function enableButton(config, button) {  // функция активной кнопки 
    button.removeAttribute('disabled'); // убирает класс с _disabled
    button.classList.remove(config.inactiveButtonClass); // активирует кнопку -- 'popup__save_disabled'
  }
  
  
  function setEventListeners (config, form) {  // функция, которая реагирует на событие 'input'
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    inputList.forEach((input) => {
      input.addEventListener('input', function () {
        checkInputValidity(config, form, input);
        toggleButtonValidity(config, form);
      });
    });
  };
  
  function enableValidation(config)  {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((form) => {
      form.addEventListener('submit', function (event) {
        event.preventDefault(); // отменяет стандартную отправку формы.
        form.reset();
      });
  
      setEventListeners(config,form);
    });
  };

  enableValidation({
        formSelector: '.popup__content',
        inputSelector: '.popup__text-area',
        submitButtonSelector: '.popup__save',
        inactiveButtonClass: 'popup__save_disabled',
        inputErrorClass: 'popup__text-area_invalid',
        errorClass: 'popup__error-text'
      }); 
      
















































// function setInputValidState(config, input, errorElement) {   // Функция, которая удаляет класс с ошибкой
//     input.classList.remove(config.inputErrorClass);  // valid
//     errorElement.textContent = '';
//   }
//   function setInputInvalidState(config, input, errorElement) { // Функция, которая добавляет класс с ошибкой
//     input.classList.add(config.inputErrorClass);    // invalid
//     errorElement.textContent = input.validationMessage;
//   }
  
  
//   function checkInputValidity(config, form, input) { 
//     const errorElement = form.querySelector(`#error-${input.id}`);  // функция проверки валидности инпутов
//     console.log(errorElement);
//     if (input.checkValidity()) {
//       setInputValidState(config, input, errorElement);
//     } else {
//      setInputInvalidState(config, input, errorElement);
//     }
//   }
  
//   function toggleButtonValidity(config, form) {  // функця, которая проверяет форму на валидность
//     const PopupSaveButton = form.querySelectorAll(config.submitButtonSelector);
   
//     if (form.checkValidity()) {
//       enableSubmitButton(PopupSaveButton);
//     } else {
//       disableSubmitButton(PopupSaveButton);
//     }
//   } 

// function disableSubmitButton(config, button) {  // функця, которая блокирует кнопку submit при невалидных инпутах 
//     button.setAttribute('disabled', '');
//     button.classList.add(config.inactiveButtonClass);
//   }
  
//   function enableSubmitButton(config, button) {  // функця, которая разблокирует кнопку submit когда инпуты валидены 
//     button.removeAttribute('disabled');
//     button.classList.remove(config.inactiveButtonClass);
    
//   }


//   function setEventListeners(config, form) {
//     const PopupInputsArray = Array.from(form.querySelectorAll(config.inputSelector)); // массив
//     PopupInputsArray.forEach(function (input) {   // функция, которая проверяет валидность при каждом событии 'input'
//       input.addEventListener('input', () => {
//         checkInputValidity(config, form, input)
//         toggleButtonValidity(form);
//       });
//     })
//   }
  
  
//   function enableValidation(config) {
//   const formList = document.querySelectorAll(config.formSelector);  //псевдомассив
//   const formListArray = Array.from(formList);  // массив
//   formListArray.forEach(function (form) { 
//     form.addEventListener('submit', function (event) {
//       event.preventDefault();
//       form.reset();
//     });
//     setEventListeners(config, form);
//   })
  
//   }
  
//   enableValidation({
//     formSelector: '.popup__content',
//     inputSelector: '.popup__text-area',
//     submitButtonSelector: '.popup__save',
//     inactiveButtonClass: 'popup__save_disabled',
//     inputErrorClass: 'popup__text-area_invalid',
//     errorClass: 'popup__error-text'
//   }); 
  
  
