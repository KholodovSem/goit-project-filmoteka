import axios from 'axios';
import Notiflix from 'notiflix';

export class FetchFilms {
  #API_KEY = '9c53a08914e6b4a1350a474be4bdfe14';
  #BASE_URL = 'https://api.themoviedb.org/3/';

  constructor() {
    this.page = 1, this.totalPage = 1000;
  }

  // Запит на список найпопулярніших фільмів на сьогодні для створення колекції на головній сторінці:
  async fetchFilmsTrending() {
    // JsLoadingOverlay.show(loadingSpinnerConfig);
    try {
      const response = await axios.get(`${this.#BASE_URL}trending/all/day?`, {
        params: {
          api_key: this.#API_KEY,
          page: this.page,
        },
      });
      // JsLoadingOverlay.hide();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  // Запит фільму за ключовим словом на головній сторінці:
  async fetchFilmsSearch(name) {
    try {
      const response = await axios.get(`${this.#BASE_URL}search/movie?`, {
        params: {
          api_key: this.#API_KEY,
          language: 'en-US',
          query: name,
          page: this.page,
          include_adult: 'false',
        },
      });
      console.log('function - fetchFilmsSearch:');
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  // Запит повної інформації про кінофільм для сторінки кінофільму:
  async fetchFilmsDetails(id) {
    try {
      const response = await axios.get(`${this.#BASE_URL}movie/${id}`, {
        params: {
          api_key: this.#API_KEY,
          language: 'en-US',
        },
      });
      console.log('function - fetchFilmsDetails:');
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  // Запит для трейлеру про кінофільм (для модального вікна):
  async fetchFilmsVideo(id) {
    try {
      const { data } = await axios.get(`${this.#BASE_URL}movie/${id}/videos`, {
        params: {
          api_key: this.#API_KEY,
          language: 'en-US',
        },
      });

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  setPage(count) {
    this.page = count;
  }
}
