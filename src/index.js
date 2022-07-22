//Импорты
import { FetchFilms } from './js/FetchFilmsClass';
import { renderMarkup } from "./js/renderMarkup";
import { scrollTo, scrollToTopButton } from './js/backToTopBtn';
import { refs } from './js/refs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';



const fetchFilms = new FetchFilms();

fetchFilms.fetchFilmsTrending().then(results => renderMarkup(results))

// const backToTopBtn = document.querySelector('.back-to-top-btn');

window.addEventListener('scroll', scrollToTopButton);
refs.backToTopBtn.addEventListener('click', scrollTo);

const pagination1 = new Pagination('pagination1', {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
});

const pagination2 = new Pagination(document.getElementById('pagination2'), {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true,
});
