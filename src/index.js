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

//! Переменные
const fetchFilms = new FetchFilms();
//Кнопка открытия модального окна и само модальное окно
const userAccBtn = refs.registrationModal.closeButtons.userAccBtnRef;
const regModal = refs.registrationModal.regModal;
//Кнопки закрытия модального окна
const topCloseRegModalBtn =
  refs.registrationModal.closeButtons.topCloseRegModalBtnRef;
const bottomCloseRegModalBtn =
  refs.registrationModal.closeButtons.bottomCloseRegModalBtnRef;
//Табы модального окна и були
const newAccTab = refs.registrationModal.tabs.newAccTabRef;
const signInTab = refs.registrationModal.tabs.signInTabRef;
let newAccTabBoolean = refs.registrationModal.tabs.newAccBoolean;
let signInTabBoolean = refs.registrationModal.tabs.signInBoolean;

//Запрос и рендеринг популярных фильмов
fetchFilms.fetchFilmsTrending().then(results => renderMarkup(results));


//Кнопка скролла вверх
window.addEventListener('scroll', scrollToTopButton);
refs.backToTopBtn.addEventListener('click', scrollTo);

//Пагинация
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
});

signInTab.addEventListener('click', e => {
  if (signInTabBoolean) {
    return;
  }

  changeTabInModal(e, newAccTab, signInTab);
  signInTabBoolean = true;
  newAccTabBoolean = false;
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






