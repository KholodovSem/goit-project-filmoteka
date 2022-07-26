import { refs } from './refs';
import 'js-loading-overlay';
import { loadingSpinnerConfig } from './spinner-config';
import { genres } from './genresObject';

export function renderMarkup(results, watched, queue) {
  refs.movieContainer.innerHTML = '';
  const markup = results.data.results
    .map(film => {
      if (film.known_for) {
        return;
      }

      return `
<li class='gallery-items films__gallery-item' data-id='${film.id}'>
<a href='#!' class='list-card__link'>
<!-- постер -->
${missingImage(film)}

<!-- обгортка інформації під постером -->
<div class='moviе-stats'>
    <h2 class='moviе-stats__title' data-id='${
      film.id
    }' data-watched='${watched}'
         data-queue='${queue}'>${nameTitleGenerate(film)}</h2>
    <div class='moviе-stats__info' >
<!-- список жанрів -->
<p class='moviе-genre'>${genreGenerate(film)}</p>
<!-- дата виходу та рейтинг -->
<p class='moviе-year'>|  ${new Date(
        releaseDateGenerate(film)
      ).getFullYear()}</p>
<!-- рейтинг -->
<p class='moviе-vote'>${film.vote_average.toFixed(1)}</p>
</div>
    </div>
</a>
</li>`;
    })
    .join('');

  refs.movieContainer.insertAdjacentHTML('beforeend', markup);
}

 export function renderMarkupLibrary(results, watched, queue) {
 console.log("renderMarkupLibrary");
 
  const markup = 
    // .map(film => {
    //   if (film.known_for) {
    //     return;
    //   }

       `
<li class='gallery-items films__gallery-item' data-id='${results.data.results[0].id}'>
<a href='#!' class='list-card__link'>
<!-- постер -->
${missingImage(results.data.results[0])}

<!-- обгортка інформації під постером -->
<div class='moviе-stats'>
    <h2 class='moviе-stats__title' data-id='${results.data.results[0].id}' data-watched='${watched}'
         data-queue='${queue}'>${nameTitleGenerate(results.data.results[0])}</h2>
    <div class='moviе-stats__info' >
<!-- список жанрів -->
<p class='moviе-genre'>${genreGenerate(results.data.results[0])}</p>
<!-- дата виходу та рейтинг -->
<p class='moviе-year'>|  ${new Date(releaseDateGenerate(results.data.results[0])).getFullYear()}</p>
<!-- рейтинг -->
<p class='moviе-vote'>${results.data.results[0].vote_average.toFixed(1)}</p>
</div>
    </div>
</a>
</li>`;
    
  

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
    return `<img src='https://www.themoviedb.org/t/p/w600_and_h900_bestv2${film.poster_path}'   alt='${film.title}'
        class='moviе-item__img'
         loading='lazy'
  />`;
  }
  return `<img src='https://sd.keepcalms.com/i-w600/sorry-poster-is-missing.jpg' alt='${film.title}' class='moviе-item__img' loading='lazy'>`;
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

// function foo (x){
//   return x
// }
// function getVideo (id){
//   return axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=9c53a08914e6b4a1350a474be4bdfe14&language=en-US`)
// }

// export function renderVideo (results) {
//   refs.cardModalMovie.innerHTML = ""
//  markup = `<div class="modal__img-wrap">
//  <a href="https://www.youtube.com/watch?v=${ results.data.results[0].key
//  }" class="modal__img-link">`
//  return refs.cardModalMovie.insertAdjacentHTML('beforeend', markup);
// }

export function renderMarkupCard(results, videoId) {
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

  const markup = `<div class='modal__img-wrap' ><iframe width="240" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</div>
      <div class='modal__info-container kennie-west'>
        <h2 class='modal__title-film'>${results.data.title}</h2>
        <table class='modal__info'>
          <tr>
            <td class='modal__info-category'>Vote/Votes</td>
            <td class='modal__info-value'>
              <span class='modal__vote'>${results.data.vote_average}</span
              ><span class='modal__slash'>/</span
              ><span class='modal__votes'>${results.data.vote_count}</span>
            </td>
          </tr>
          <tr>
            <td class='modal__info-category'>Popularity</td>
            <td class='modal__info-value'>${results.data.popularity}</td>
          </tr>
          <tr>
            <td class='modal__info-category'>Original Title</td>
            <td class='modal__info-value'>${results.data.original_title}</td>
          </tr>
          <tr>
            <td class='modal__info-category'>Genre</td>
            <td class='modal__info-value'>${results.data.genres
              .map(item => item.name)
              .join(', ')}</td>
          </tr>
        </table>
        <p class='modal__title-about'>About</p>
        <p class='modal__article-about-movie'>
          ${results.data.overview}
        </p>
        <div class='modal__button-wrap'>
          <div class='modal__button-container'>
            <button type='submit' class='modal__button js-watched-add' id='js-watched-add' data-id='${
              results.data.id
            }'>ADD TO WATCHED</button>
            <button type='button' class='modal__button js-watched-delete visually-hidden' id='js-watched-del' data-id='${
              results.data.id
            }'>
              DELETE FROM WATCHED
            </button>
          </div>
          <div class='modal__button-container'>
          <button type='submit' class='modal__button js-queue-add' id='js-queue-add' data-id='${
            results.data.id
          }'>ADD TO QUEUE</button>
            <button type='submit' class='modal__button js-queue-delete visually-hidden' id='js-queue-del' data-id='${
              results.data.id
            }'>DELETE FROM  QUEUE</button>
          </div>
        </div>
      </div>`;

  return refs.cardModalMovie.insertAdjacentHTML('beforeend', markup);
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
