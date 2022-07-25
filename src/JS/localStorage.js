export const localStorageAPI = {
  save(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  },

  load(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  },
};

//Переключение между главной страницой и библиотекой
export function currentPageLibrary(){
  localStorageAPI.save('CurrentPage', 'Library')
}

export function currentPageHome(){
  localStorageAPI.save('CurrentPage', 'Home')
}

//
const queueFilms = [];

export function addNameFilmByQueue (element){
  queueFilms.push(element.textContent);
  localStorageAPI.save('QueueFilms',queueFilms);
}