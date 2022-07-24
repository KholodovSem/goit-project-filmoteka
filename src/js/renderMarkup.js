import { refs } from './refs';
import { genres } from './genresObject';
import { FetchFilms } from './FetchFilmsClass';
const { MovieTrendContainer } = refs;

export function renderMarkup(results, watched, queue) {
  refs.movieContainer.innerHTML = '';
  const markup = results.data.results
    .map(film => {
      if (film.known_for) {
        return;
      }

      return `
<li class="gallery-items films__gallery-item" data-id=${film.id}>
<a href="#!" class="list-card__link">
<!-- постер -->
${missingImage(film)}
  
<!-- обгортка інформації під постером -->
<div class="moviе-stats">
    <h2 class="moviе-stats__title" data-id=${film.id} data-watched=${watched}
         data-queue=${queue}>${nameTitleGenerate(film)}</h2>
    <div class="moviе-stats__info" >
<!-- список жанрів -->
<p class="moviе-genre">${genreGenerate(film)}</p>
<!-- дата виходу та рейтинг -->
<p class="moviе-year">|  ${new Date(
        releaseDateGenerate(film)
      ).getFullYear()}</p>
<!-- рейтинг -->
<p class="moviе-vote">${film.vote_average.toFixed(1)}</p>
</div>
    </div>
</a>
</li>`;
    })
    .join('');

  refs.movieContainer.insertAdjacentHTML('beforeend', markup);
}

// Функция генерации жанра по его длине
function genreGenerate(film) {
  if (film.genre_ids.length === 1) {
    return genres[film.genre_ids[0]];
  }
  if (film.genre_ids.length === 2) {
    return `${genres[film.genre_ids[0]]}, ${genres[film.genre_ids[1]]}`;
  }

  if (film.genre_ids.length > 2) {
    return `${genres[film.genre_ids[0]]}, ${genres[film.genre_ids[1]]}, Other`;
  }
}

// Функция проверки свойства имени
function nameTitleGenerate(film) {
  if (film.title) {
    return film.title;
  }
  return film.name;
}

// Функция проверки даты выхода фильма
function releaseDateGenerate(film) {
  if (film.release_date) {
    return film.release_date;
  }
  return film.first_air_date;
}

function missingImage(film) {
  if (film.poster_path) {
    return `<img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${film.poster_path}"   alt="${film.title}"
        class="moviе-item__img" 
         loading="lazy" 
  />`;
  }
  return `<img src="https://sd.keepcalms.com/i-w600/sorry-poster-is-missing.jpg" alt="${film.title}" class="moviе-item__img" loading="lazy">`;
}

// Функция поиска фильма по имени
// const fetchFilms = new FetchFilms();
// refs.form.addEventListener('submit', searchImage);
// function searchImage(event) {
//   event.preventDefault();
//   const query = refs.input.value;
//   if (query) {
//     fetchFilms.fetchFilmsSearch(query).then(results => renderMarkup(results));
//   }
// }

// Функция добавления фильма в карточку фильма
export function renderMarkupCard(data) {
  refs.cardModalMovie.innerHTML = '';
  // const {
  //   poster_path,
  //   title,
  //   vote_average,
  //   vote_count,
  //   popularity,
  //   original_title,
  //   genres,
  //   overview,
  //   id,
  // } = data;

  const markup = results.data.results
    .map(film => {
      if (film.known_for) {
        return;
      }

      return `
<div class="modal__img-wrap">
      <a href="https://www.youtube.com/watch?v=BmllggGO4pM" class="modal__img-link">
  ${missingImage(film)}
        <div class="modal__play-bacground">
          <span class="modal__svg-background"></span>
        </div>
        </a>
</div>
      <div class="modal__info-container">
        <h2 class="modal__title-film">${nameTitleGenerate(film)}</h2>
        <table class="modal__info">
          <tr>
            <td class="modal__info-category">Vote/Votes</td>
            <td class="modal__info-value">
              <span class="modal__vote">${film.vote_average}</span
              ><span class="modal__slash">/</span
              ><span class="modal__votes">${film.vote_count}</span>
            </td>
          </tr>
          <tr>
            <td class="modal__info-category">Popularity</td>
            <td class="modal__info-value">${film.popularity}</td>
          </tr>
          <tr>
            <td class="modal__info-category">Original Title</td>
            <td class="modal__info-value">${film.original_title}</td>
          </tr>
          <tr>
            <td class="modal__info-category">Genre</td>
            <td class="modal__info-value">${film.genres
              .map(item => item.name)
              .join(', ')}</td>
          </tr>
        </table>
        <p class="modal__title-about">About</p>
        <p class="modal__article-about-movie">
          ${film.overview}
        </p>
        <div class="modal__button-wrap">
          <div class="modal__button-container">
            <button type="submit" class="modal__button js-watched-add" id="js-watched-add" data-id=${
              film.id
            }>
              ADD TO WATCHED
            </button>
            <button type="button" class="modal__button js-watched-delete visually-hidden" id="js-watched-del" data-id=${
              film.id
            }>
              DELETE FROM WATCHED
            </button>
          </div>
          <div class="modal__button-container">
          <button type="submit" class="modal__button js-queue-add" id="js-queue-add" data-id=${
            film.id
          }>
              ADD TO QUEUE
            </button>
            <button type="submit" class="modal__button js-queue-delete visually-hidden" id="js-queue-del" data-id=${
              film.id
            }>
              DELETE FROM  QUEUE
            </button>
          </div>
        </div>
      </div>`;
    })
    .join('');
  refs.cardModalMovie.insertAdjacentHTML('beforeend', markup);
}

// Функция добавления фильма в карточку фильма
// export function renderMarkupCard(data) {
//   refs.cardModalMovie.innerHTML = '';
//   const {
//     poster_path,
//     title,
//     vote_average,
//     vote_count,
//     popularity,
//     original_title,
//     genres,
//     overview,
//     id,
//   } = data;

//   const markup = `
// <div class="modal__img-wrap">
//       <a href="https://www.youtube.com/watch?v=BmllggGO4pM" class="modal__img-link">
//   ${
//     poster_path
//       ? ` <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${poster_path}"
//          alt="${title}" loading="lazy"
//         class="modal__img" data-id=${id}
//    />`
//       : `<img src="https://sd.keepcalms.com/i-w600/sorry-poster-is-missing.jpg"  alt="${title}" loading="lazy"
//         class="modal__img" data-id=${id} >`
//   }
//         <div class="modal__play-bacground">
//           <span class="modal__svg-background"></span>
//         </div>
//         </a>
// </div>
//       <div class="modal__info-container">
//         <h2 class="modal__title-film">${title}</h2>
//         <table class="modal__info">
//           <tr>
//             <td class="modal__info-category">Vote/Votes</td>
//             <td class="modal__info-value">
//               <span class="modal__vote">${vote_average}</span
//               ><span class="modal__slash">/</span
//               ><span class="modal__votes">${vote_count}</span>
//             </td>
//           </tr>
//           <tr>
//             <td class="modal__info-category">Popularity</td>
//             <td class="modal__info-value">${popularity}</td>
//           </tr>
//           <tr>
//             <td class="modal__info-category">Original Title</td>
//             <td class="modal__info-value">${original_title}</td>
//           </tr>
//           <tr>
//             <td class="modal__info-category">Genre</td>
//             <td class="modal__info-value">${genres
//               .map(item => item.name)
//               .join(', ')}</td>
//           </tr>
//         </table>
//         <p class="modal__title-about">About</p>
//         <p class="modal__article-about-movie">
//           ${overview}
//         </p>
//         <div class="modal__button-wrap">
//           <div class="modal__button-container">
//             <button type="submit" class="modal__button js-watched-add" id="js-watched-add" data-id=${id}>
//               ADD TO WATCHED
//             </button>
//             <button type="button" class="modal__button js-watched-delete visually-hidden" id="js-watched-del" data-id=${id}>
//               DELETE FROM WATCHED
//             </button>
//           </div>
//           <div class="modal__button-container">
//           <button type="submit" class="modal__button js-queue-add" id="js-queue-add" data-id=${id}>
//               ADD TO QUEUE
//             </button>
//             <button type="submit" class="modal__button js-queue-delete visually-hidden" id="js-queue-del" data-id=${id}>
//               DELETE FROM  QUEUE
//             </button>
//           </div>
//         </div>
//       </div>`;
//   refs.cardModalMovie.insertAdjacentHTML('beforeend', markup);
// }
