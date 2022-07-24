//Импорты
import { FetchFilms } from './js/FetchFilmsClass';
import { renderMarkup } from './js/renderMarkup';
import { scrollTo, scrollToTopButton } from './js/backToTopBtn';
import { refs } from './js/refs';
import {
  options,
  pagination1,
  paginationTrending,
  paginationSearch,
} from './js/pagination';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import './js/modal-cards.js';
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
import Notiflix from 'notiflix';
console.log(paginationTrending);
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

//*Кнопка скролла вверх
window.addEventListener('scroll', scrollToTopButton);
refs.backToTopBtn.addEventListener('click', scrollTo);

//*Пагинация

fetchFilms.fetchFilmsTrending().then(results => renderMarkup(results));

refs.pagination.addEventListener('click', event => {
  if (event.target.textContent === 'prev') {
    fetchFilms.decrementPage();
    return fetchFilms
      .fetchFilmsTrending()
      .then(results => renderMarkup(results));
  }
  if (event.target.textContent === 'first') {
    fetchFilms.setPage(1);
    return fetchFilms
      .fetchFilmsTrending()
      .then(results => renderMarkup(results));
  }
  if (event.target.textContent === 'next') {
    fetchFilms.incrementPage();
    return fetchFilms
      .fetchFilmsTrending()
      .then(results => renderMarkup(results));
  }

  if (event.target.textContent === 'last') {
    fetchFilms.setPage(100);
    return fetchFilms
      .fetchFilmsTrending()
      .then(results => renderMarkup(results));
  }

  if (event.target.textContent === '...') {
    return;
  }

  const page = event.target.textContent;
  fetchFilms.setPage(page);

  return fetchFilms.fetchFilmsTrending().then(results => renderMarkup(results));
});

refs.pagination.addEventListener('click', paginationTrending);


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
let query = '';
refs.form.addEventListener('submit', searchFilm);

function searchFilm(event) {
  event.preventDefault();
  fetchFilms.setPage(1);
  options.page = 1;
  query = refs.input.value;
  if (query) {
    fetchFilms.fetchFilmsSearch(query).then(results => {
      if (results.data.results.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there aren`t films with that name. Try again'
        );
      }

      options.totalItems = results.data.total_pages * 5;
      if (options.totalItems > 500) {
        options.totalItems = 500;
      }
      const pagination1 = new Pagination('pagination1', options);
      return renderMarkup(results);
    });
  }
  refs.pagination.removeEventListener('click', paginationTrending);
  refs.pagination.removeEventListener('click', paginationCallback);
  refs.pagination.addEventListener('click', paginationCallback);
}


// Modal footer

function paginationCallback(event) {
  paginationSearch(event, query);
}

const openFooterModal = document.querySelector('.footer__btn');
const backdrop = document.querySelector('.developers__backdrop');
const modalWindow = document.querySelector('.developers__modal');
const backToTopBtn = document.querySelector('.back-to-top-btn');
const body = document.body;
openFooterModal.addEventListener('click', onModalOpen);

function onModalOpen() {
  body.classList.add('no-scroll');
  backToTopBtn.classList.add('is-hidden');
  modalWindow.classList.remove('is-hidden');
  backdrop.classList.remove('is-hidden');
}

document.addEventListener('keydown', onModalClose);
backdrop.addEventListener('click', onCloseBackdrop);

function onModalClose(e) {
  if (e.code === 'Escape') {
    body.classList.remove('no-scroll');
    modalWindow.classList.add('is-hidden');
    backdrop.classList.add('is-hidden');
    document.removeEventListener('keydown', onModalClose);
    backdrop.addEventListener('click', onModalClose);
  }
}

function onCloseBackdrop(e) {
  console.log(e);
  if (e.target === backdrop) {
    body.classList.remove('no-scroll');
    backdrop.classList.add('is-hidden');
  }
}

