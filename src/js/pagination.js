import Pagination from 'tui-pagination';
// import 'js-loading-overlay';
// import { loadingSpinnerConfig } from './spinner-config';
import 'tui-pagination/dist/tui-pagination.css';
import { FetchFilms } from './FetchFilmsClass';
import { renderMarkup } from './renderMarkup';
import { refs } from './refs';
import { fetchFilms, query } from '../index';


export const options = {
  totalItems: 500,
  itemsPerPage: 5,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

 const pagination1 = new Pagination('pagination1', options);

export function paginationTrending(event) {
  // JsLoadingOverlay.show(loadingSpinnerConfig);
  if (event.target.textContent === 'prev') {
    fetchFilms.decrementPage();
    scrollTo();
    return fetchFilms
      .fetchFilmsTrending()
      .then(results => renderMarkup(results));
  }
  if (event.target.textContent === 'first') {
    fetchFilms.setPage(1);
    scrollTo();
    return fetchFilms
      .fetchFilmsTrending()
      .then(results => renderMarkup(results));
  }
  if (event.target.textContent === 'next') {
    fetchFilms.incrementPage();
    scrollTo();
    return fetchFilms
      .fetchFilmsTrending()
      .then(results => renderMarkup(results));
  }

  if (event.target.textContent === 'last') {
    fetchFilms.setPage(100);
    scrollTo();
    return fetchFilms
      .fetchFilmsTrending()
      .then(results => renderMarkup(results));
  }

  if (event.target.textContent === '...') {
    return;
  }
  // JsLoadingOverlay.hide();
  const page = event.target.textContent;

  fetchFilms.setPage(Number(page));

  scrollTo();

  return fetchFilms.fetchFilmsTrending().then(results => renderMarkup(results));
}

export function paginationSearch(event, query) {
 
  


  if (event.target.textContent === 'prev') {
    fetchFilms.decrementPage();
    scrollTo();
    return fetchFilms
      .fetchFilmsSearch(query)
      .then(results => renderMarkup(results));
  }
  if (event.target.textContent === 'first') {
    fetchFilms.setPage(1);
    scrollTo();
    return fetchFilms
      .fetchFilmsSearch(query)
      .then(results => renderMarkup(results));
  }
  if (event.target.textContent === 'next') {
    console.log(fetchFilms.page, "DO");
    fetchFilms.incrementPage();
    console.log(fetchFilms.page, "POSlE");
    scrollTo();
    return fetchFilms
      .fetchFilmsSearch(query)
      .then(results => renderMarkup(results));
  }

  if (event.target.textContent === 'last') {
    fetchFilms.setPage(options.totalItems / 5);
    scrollTo();
    return fetchFilms
      .fetchFilmsSearch(query)
      .then(results => renderMarkup(results));
  }

  if (event.target.textContent === '...') {
    return;
  }

  const page = event.target.textContent;

  fetchFilms.setPage(Number(page));
  // JsLoadingOverlay.hide();
  scrollTo();

  return fetchFilms
    .fetchFilmsSearch(query)
    .then(results => renderMarkup(results));
}


export function searchFilm(event,) {
  event.preventDefault();
  fetchFilms.page = 1;


  pagination1.movePageTo(1)

   query = refs.input.value;
  if (query) {
    fetchFilms.fetchFilmsSearch(query).then(results => {
      if (results.data.results.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there aren`t films with that name. Try again'
        );
      }

      options.totalItems = Number(results.data.total_pages) * 5 ;
     
    console.log(options.totalItems);
      if (options.totalItems > 500) {
        options.totalItems = 500;
      }
      JsLoadingOverlay.hide();
      const pagination1 = new Pagination('pagination1', options);
      return renderMarkup(results);
    });
  }
  console.log("LISTETERS")
  refs.pagination.removeEventListener('click', paginationTrending);
  refs.pagination.removeEventListener('click', paginationCallback);
  refs.pagination.addEventListener('click', paginationCallback);
}

export function paginationCallback(event) {
  paginationSearch(event, query);
}