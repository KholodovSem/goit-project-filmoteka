//Ссылки на DOM-elements
const userAccBtnRef = document.querySelector('.registration-btn');
const regModal = document.querySelector('.registration-modal');
const topCloseRegModalBtnRef = document.querySelector('.modal-btn');
const bottomCloseRegModalBtnRef = document.querySelector(
  '.tab-change-btn.cancel'
);
//Табы
const signInTabRef = document.querySelector('[data-sign-in-tab]');
const newAccTabRef = document.querySelector('[data-new-account-tab]');
//Слушатели событий

//* Кнопки закрытия модалки
userAccBtnRef.addEventListener('click', openRegModal);
topCloseRegModalBtnRef.addEventListener('click', closeRegModal);
bottomCloseRegModalBtnRef.addEventListener('click', closeRegModal);

//! Були для табов
let newAccBoolean = false;
let signInBoolean = false;

//? Табы
newAccTabRef.addEventListener('click', e => {
  if (newAccBoolean) {
    return;
  }

  changeTabInModal(e);
  newAccBoolean = true;
  signInBoolean = false;
});

signInTabRef.addEventListener('click', e => {
  if (signInBoolean) {
    return;
  }

  changeTabInModal(e);
  signInBoolean = true;
  newAccBoolean = false;
});

//Функции
function openRegModal(e) {
  e.preventDefault();
  regModal.classList.add('modal-isVisible');
}

function closeRegModal(e) {
  e.preventDefault();
  regModal.classList.remove('modal-isVisible');
}

function changeTabInModal(e) {
  e.preventDefault();

  newAccTabRef.classList.toggle('active');
  newAccTabRef.classList.toggle('non-active');

  signInTabRef.classList.toggle('active');
  signInTabRef.classList.toggle('non-active');
}
