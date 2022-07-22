import { refs } from './refs';
import { genres } from './genresObject';
const { MovieTrendContainer } = refs;


export function renderMarkup(results, watched, queue) {
  refs.movieContainer.innerHTML = '';
  const markup = results.data.results.map(film => 
        `
<li class="gallery-items films__gallery-item" data-id=${film.id}>
<a href="#!" class="list-card__link">
<!-- постер -->
${missingImage (film)}
  
<!-- обгортка інформації під постером -->
<div class="moviе-stats">
    <h2 class="moviе-stats__title" data-id=${film.id} data-watched=${watched}
         data-queue=${queue}>${nameTitleGenerate(film)}</h2>
    <div class="moviе-stats__info" >
<!-- список жанрів -->
<p class="moviе-genre">${genreGenerate(film)}</p>
<!-- дата виходу та рейтинг -->
<p class="moviе-year">|  ${new Date(releaseDateGenerate(film)).getFullYear()}</p>
<!-- рейтинг -->
<p class="moviе-vote">${film.vote_average.toFixed(1)}</p>
</div>
    </div>
</a>
</li>`
).join("")

    refs.movieContainer.insertAdjacentHTML('beforeend', markup);
}
  

// Функция генерации жанра по его длине
  function genreGenerate(film){

    if(film.genre_ids.length === 1){
        return genres[film.genre_ids[0]];
    }
    if(film.genre_ids.length === 2){
        return `${genres[film.genre_ids[0]]}, ${genres[film.genre_ids[1]]}`;
    }

    if(film.genre_ids.length > 2){
        return `${genres[film.genre_ids[0]]}, ${genres[film.genre_ids[1]]}, Other`
    }
}

// Функция проверки свойства имени 
 function nameTitleGenerate(film){

    if(film.title){
        return film.title
    }
    return film.name
}

// Функция проверки даты выхода фильма 
function releaseDateGenerate(film){
    if( film.release_date){ 
        return film.release_date;
    }   
    return  film.first_air_date;
}

 function missingImage (film){


    if(film.poster_path){
       return   `<img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${film.poster_path}"   alt="${film.title}"
        class="moviе-item__img" 
         loading="lazy" 
  />`
    }
     return `<img src="https://sd.keepcalms.com/i-w600/sorry-poster-is-missing.jpg" alt="${film.title}" class="moviе-item__img" loading="lazy">`;
}