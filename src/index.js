import { FetchFilms } from "./js/FetchFilmsClass";
import { refs } from "./js/refs";
import { renderMarkup } from "./js/renderMarkup";
const a = 1;


const fetchFilms = new FetchFilms();
fetchFilms.fetchFilmsTrending().then(results => renderMarkup(results))






       



    


