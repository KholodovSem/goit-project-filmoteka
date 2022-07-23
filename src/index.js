//Импорты
import { FetchFilms } from './js/FetchFilmsClass';
import { renderMarkup } from './js/renderMarkup';
import { scrollTo, scrollToTopButton } from './js/backToTopBtn';
import { refs } from './js/refs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import {
  openRegModal,
  closeRegModal,
  changeTabInModal,
} from './JS/registration-modal';
import {
  userRegistration,
  userAuthorization,
} from './JS/registrationAndAuthorization';
import { localStorageAPI } from './JS/localStorage';

//! Переменные
const fetchFilms = new FetchFilms();
//?Модальное окно регистрации
//Форма
const registrationModalForm = refs.registrationModal.form;
//Кнопка открытия модального окна и само модальное окно
const userAccBtn = refs.registrationModal.closeButtons.userAccBtnRef;
const regModal = refs.registrationModal.regModal;
//Кнопки закрытия модального окна
const topCloseRegModalBtn =
  refs.registrationModal.closeButtons.topCloseRegModalBtnRef;
const bottomCloseRegModalBtn =
  refs.registrationModal.closeButtons.bottomCloseRegModalBtnRef;
//Кнопка LOGIN
const loginBtn = refs.registrationModal.closeButtons.loginButton;
//Табы модального окна и були
const newAccTab = refs.registrationModal.tabs.newAccTabRef;
const signInTab = refs.registrationModal.tabs.signInTabRef;
let newAccTabBoolean = refs.registrationModal.tabs.newAccBoolean;
let signInTabBoolean = refs.registrationModal.tabs.signInBoolean;
//? Навигационные ссылки хедера
const homeLink = refs.navigation.homeLink;
const libraryLink = refs.navigation.libraryLink;

//*Проверка доступа
(function () {
  setInterval(() => {
    const checkPremission = localStorageAPI.load('Permission');
    if (+checkPremission === 1) {
      homeLink.classList.remove('disabled');
      libraryLink.classList.remove('disabled');
    }
  }, 1000);
})();

//*Запрос и рендеринг популярных фильмов
fetchFilms.fetchFilmsTrending().then(results => renderMarkup(results));

//*Кнопка скролла вверх
window.addEventListener('scroll', scrollToTopButton);
refs.backToTopBtn.addEventListener('click', scrollTo);

//*Пагинация
const pagination1 = new Pagination('pagination1', {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
});

//*Модальное окно регистрации
// Открытие модального окна
userAccBtn.addEventListener('click', event => openRegModal(event, regModal));
//Закрыте модального окна
topCloseRegModalBtn.addEventListener('click', event =>
  closeRegModal(event, regModal)
);
bottomCloseRegModalBtn.addEventListener('click', event =>
  closeRegModal(event, regModal)
);
//Переключение между табами модального окна
newAccTab.addEventListener('click', e => {
  if (newAccTabBoolean) {
    return;
  }

  changeTabInModal(e, newAccTab, signInTab);
  newAccTabBoolean = true;
  signInTabBoolean = false;

  if (newAccTabBoolean) {
    loginBtn.textContent = 'CREATE ACCOUNT';
  }
});

signInTab.addEventListener('click', e => {
  if (signInTabBoolean) {
    return;
  }

  changeTabInModal(e, newAccTab, signInTab);
  signInTabBoolean = true;
  newAccTabBoolean = false;

  if (signInTabBoolean) {
    loginBtn.textContent = 'LOGIN';
  }
});

//* Регистрация и авторизация пользователей
//Регистрация и авторизация

registrationModalForm.addEventListener('submit', event => {
  console.log(signInTabBoolean);
  if (!signInTabBoolean) {
    console.log(signInTabBoolean);
    userRegistration(event);
    event.target.reset();
    regModal.classList.remove('modal-isVisible');
    return;
  }
  userAuthorization(event);
  localStorageAPI.save('Permission', '1');
  event.target.reset();
  regModal.classList.remove('modal-isVisible');
});

// What is this?
refs.form.addEventListener('submit', searchImage);

// function clearGallery() {
//   refs.gallery.innerHTML = '';
// }

function searchImage(event) {
  event.preventDefault();

  const query = refs.input.value;
  console.log(query);
  if (query) {
    // searchBtn.toggleIcon().disable();

    fetchFilms.fetchFilmsSearch(query).then(results => renderMarkup(results));
    console.log(query);
    // searchBtn.toggleIcon().enable();
  }
}
