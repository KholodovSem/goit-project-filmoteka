//Импорты
import { FetchFilms } from './js/FetchFilmsClass';
import { renderMarkup } from './js/renderMarkup';
import { scrollTo, scrollToTopButton } from './js/backToTopBtn';
import { refs } from './js/refs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const fetchFilms = new FetchFilms();

// fetchFilms.fetchFilmsTrending().then(results => renderMarkup(results));

// const backToTopBtn = document.querySelector('.back-to-top-btn');

window.addEventListener('scroll', scrollToTopButton);
refs.backToTopBtn.addEventListener('click', scrollTo);

const pagination1 = new Pagination('pagination1', {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
});


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





