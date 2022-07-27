//Импорты
import 'js-loading-overlay';
import { loadingSpinnerConfig } from './JS/spinner-config';
import { FetchFilms } from './js/FetchFilmsClass';
import {
  renderMarkup,
  renderMarkupCard,
  renderMarkupLibrary,
} from './js/renderMarkup';
import { scrollTo, scrollToTopButton } from './js/backToTopBtn';
import { refs } from './js/refs';
import './js/masiania';
import { paginationTrending, searchFilm } from './js/pagination';
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
import {
  localStorageAPI,
  currentPageLibrary,
  currentPageHome,
} from './JS/localStorage';
import Notiflix from 'notiflix';
import Pagination from 'tui-pagination';

import 'tui-pagination/dist/tui-pagination.css';



//! Переменные
export const fetchFilms = new FetchFilms();
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
const queueFilms = [];
const watchedFilms = [];

//*Проверка доступа
(function () {
  setInterval(() => {
    const checkPremission = localStorageAPI.load('Permission');
    if (+checkPremission === 1) {
      homeLink.classList.remove('disabled');
      libraryLink.classList.remove('disabled');
      userAccBtn.style.display = 'none';
    }
  }, 1000);
})();

//Рендеринг для главной страницы и для библиотеки
libraryLink.addEventListener('click', currentPageLibrary);
homeLink.addEventListener('click', currentPageHome);

//*Запрос и рендеринг популярных фильмов

//*Кнопка скролла вверх
window.addEventListener('scroll', scrollToTopButton);
refs.backToTopBtn.addEventListener('click', scrollTo);

//*Пагинация

function watchedListenerFoo() {
  refs.movieContainer.innerHTML = '';
  watchedFilms.forEach(film =>
    fetchFilms
      .fetchFilmsSearch(film)
      .then(results => renderMarkupLibrary(results))
  );
}

(function checkPage() {
  if (localStorageAPI.load('CurrentPage') === 'Library') {
    setTimeout(()=>{ watchedListenerFoo ()}, 0)
    const paginate= document.querySelector(".tui-pagination ")
    paginate.style.display = "none";
    const btnWatchedHeader = document.querySelector("[data-btnWatchedLibrary]")
    const btnQueueHeader = document.querySelector("[data-btnQueueLibrary]");
    btnWatchedHeader.style.backgroundColor = "#ff6b08";
    btnWatchedHeader.style.border = "none";

    btnWatchedHeader.addEventListener('click', watchedListenerFoo);

    btnQueueHeader.addEventListener('click', event => {
      btnWatchedHeader.removeAttribute('style');
      refs.movieContainer.innerHTML = '';
      queueFilms.forEach(film =>
        fetchFilms.fetchFilmsSearch(film).then(results => {
          return renderMarkupLibrary(results);
        })
      );
    });
    return;
  }
  fetchFilms.fetchFilmsTrending().then(results => renderMarkup(results));
})();

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



// Modal footer



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

//
(function checkLocalStorage() {
  if (localStorageAPI.load('WatchedFilms')) {
    watchedFilms.push(...localStorageAPI.load('WatchedFilms'));
  }
  if (localStorageAPI.load('QueueFilms')) {
    queueFilms.push(...localStorageAPI.load('QueueFilms'));
  }
})();

// renderMarkupCard()

refs.movieContainer.addEventListener('click', async event => {
  const id = event.target.getAttribute('data-id');

  const { results } = await fetchFilms.fetchFilmsVideo(id);

  const videoId = results[0].key;

  fetchFilms.fetchFilmsDetails(id).then(async results => {
    await renderMarkupCard(results, videoId);

    const modalCardRef = document.querySelector('.kennie-west');
    const nameFilm = document.querySelector('.modal__title-film');

    function checkButtons() {
      if (
        localStorageAPI.load('Permission') === '0' ||
        localStorageAPI.load('Permission') === undefined
      ) {
        const btnQueue = document.querySelector('#js-queue-add');
        const btnWatched = document.querySelector('#js-watched-add');
        btnQueue.setAttribute('disabled', 1);
        btnWatched.setAttribute('disabled', 1);
      }

      if (queueFilms.includes(nameFilm.textContent)) {
        const btn = document.querySelector('#js-queue-add');
        btn.textContent = 'Remove from queue';
      }
      if (watchedFilms.includes(nameFilm.textContent)) {
        const btn = document.querySelector('#js-watched-add');
        btn.textContent = 'Remove from watched';
      }
    }
    checkButtons();

    function addNameFilmByQueue(element) {
      if (queueFilms.includes(element.textContent)) {
        return;
      }
      queueFilms.push(element.textContent);
      localStorageAPI.save('QueueFilms', queueFilms);
    }

    function addNameFilmByQueueOrWatchedListener(event) {
      if (
        event.target.getAttribute('id') === 'js-queue-add' &&
        event.target.textContent === 'ADD TO QUEUE'
      ) {
        event.target.textContent = 'Remove from queue';
        addNameFilmByQueue(nameFilm);
        return;
      }

      if (
        event.target.getAttribute('id') === 'js-queue-add' &&
        event.target.textContent === 'Remove from queue'
      ) {
        event.target.textContent = 'ADD TO QUEUE';
        const indexToDelete = queueFilms.findIndex(
          e => e === nameFilm.textContent
        );
        queueFilms.splice(indexToDelete, 1);
        localStorageAPI.save('QueueFilms', queueFilms);
      }

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (
        event.target.getAttribute('id') === 'js-watched-add' &&
        event.target.textContent === 'ADD TO WATCHED'
      ) {
        event.target.textContent = 'Remove from watched';
        addNameFilmByWatched(nameFilm);
        return;
      }

      if (
        event.target.getAttribute('id') === 'js-watched-add' &&
        event.target.textContent === 'Remove from watched'
      ) {
        event.target.textContent = 'ADD TO WATCHED';
        const indexToDelete = watchedFilms.findIndex(
          e => e === nameFilm.textContent
        );
        watchedFilms.splice(indexToDelete, 1);
        localStorageAPI.save('WatchedFilms', watchedFilms);
      }
    }
    //
    function addNameFilmByWatched(element) {
      if (watchedFilms.includes(element.textContent)) {
        return;
      }
      watchedFilms.push(element.textContent);
      localStorageAPI.save('WatchedFilms', watchedFilms);
    }

    modalCardRef.addEventListener('click', addNameFilmByQueueOrWatchedListener);
  });
});
