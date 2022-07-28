<<<<<<< Updated upstream
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
export let query = '';
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
=======
import debounce from 'lodash.debounce';
import { Report } from 'notiflix/build/notiflix-report-aio';
import Delivery from './js/Delivery';
import { logOutForm, registerOpen } from './js/authentication';
import { createMarkup } from './js/markupFilmCard';
import getPagination from './js/pagination';
import loading from './js/loadingSpinner';
import { refs } from './js/filters';
import './js/modalSingUp';
import './js/modal';
import './js/filters';
import './js/authentication';

const container = document.getElementById('tui-pagination-container');
const listRef = document.querySelector('.list__film');
const signUp = document.querySelector('#user');
const search = document.querySelector('#search-box');
const delivery = new Delivery();
const user = JSON.parse(sessionStorage.getItem('user'));

search.addEventListener('input', debounce(searchMovies, 500));
refs.resetBtnRef.addEventListener('click', resetFilters);

let instance;
if (user) {
    signUp.textContent = user.displayName || 'Anonymous';
    signUp.removeEventListener('click', registerOpen);
    signUp.addEventListener('click', logOutForm);
} else {
    signUp.removeEventListener('click', logOutForm);
    signUp.addEventListener('click', registerOpen);
    signUp.textContent = 'Login | Join';
}

searchMovies();

async function searchMovies() {
    if (instance) {
        instance.reset();
    }

    container.removeAttribute('style');
    const query = search.value.trim();
    delivery.query = query;
    const data = await getMovies();
    if (data.total_results) {
        instance = getPagination(data.total_results, 20);
        instance.on('afterMove', loadPage);
    } else {
        container.setAttribute('style', 'display: none');
        Report.failure(
            'Search result not successful &#9785 ',
            'Enter the correct movie name and try again.',
            'Okay',
            {
                width: '400px',
                svgSize: '100px',
                titleFontSize: '20px',
                messageFontSize: '18px',
                buttonFontSize: '20px',
                borderRadius: '10px',
            }
        );
    }
>>>>>>> Stashed changes
}

async function getMovies() {
    loading.show();
    let data;

    try {
        data = delivery.query
            ? await delivery.search()
            : await delivery.trend();
        const markup = createMarkup(data.results);
        listRef.innerHTML = markup;
    } catch (error) {
        console.log('ERROR = ', error);
    }
    loading.close();

    return data;
}

function loadPage(event) {
    delivery.page = event.page;
    getMovies();
}

export async function addFilter(year = '', boolean = false) {
    if (instance) {
        instance.reset();
    }
    const query = search.value.trim();
    delivery.query = query;
    delivery.primary_release_year = year;
    delivery.include_adult = boolean;
    let data;
    try {
        if (!delivery.query) {
            delivery.query = 'all';
        }
        data = await delivery.search();
        const markup = createMarkup(data.results);
        listRef.innerHTML = markup;
    } catch (error) {
        console.log('ERROR = ', error);
    }
    return data;
}

async function resetFilters() {
    if (instance) {
        instance.reset();
    }
    search.value = '';
    delivery.primary_release_year = '';
    refs.forAdult.checked = false;
    refs.rangeSlider.value = 2022;
    refs.rangeBullet.innerHTML = refs.rangeSlider.value;
    let data;
    try {
        data = await refs.delivery.trend();
        const markup = createMarkup(data.results);
        refs.listRef.innerHTML = markup;
    } catch (error) {
        console.log('ERROR = ', error);
    }
<<<<<<< Updated upstream

    modalCardRef.addEventListener('click', addNameFilmByQueueOrWatchedListener);
  });
});
=======
    return data;
}
>>>>>>> Stashed changes
