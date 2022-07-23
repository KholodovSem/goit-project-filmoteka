// Импорты
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import Notiflix from 'notiflix';

//Переменные
const firebaseConfig = {
  apiKey: 'AIzaSyCO-ILMV2EekKKemkyPKq5E9bB1w0Pe7GE',
  authDomain: 'filmoteka-f350f.firebaseapp.com',
  databaseURL:
    'https://filmoteka-f350f-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-f350f',
  storageBucket: 'filmoteka-f350f.appspot.com',
  messagingSenderId: '1080318171638',
  appId: '1:1080318171638:web:90d4d887cd5c9c76f68fd7',
};

const app = initializeApp(firebaseConfig);

//Уведомления Notiflix
//*Регистрация
export const succesRegistration = function () {
  Notiflix.Notify.success(
    'Congratulations &#127881 Registration completed successfully!'
  );
  Notiflix.Notify.success('Now please login &#128588');
};
const failedRegistration = function () {
  Notiflix.Notify.failure('Ooops &#128533 Something went wrong');
};

//*Авторизация
const succesAuthorization = function () {
  Notiflix.Notify.success('Welcome back! &#128527');
};
const failedAuthorization = function () {
  Notiflix.Notify.failure('Who are you?  Lets goodbye &#128075');
};

//Функция регистрации
export function userRegistration(event) {
  event.preventDefault();
  const email = event.target.elements[0].value;
  const password = event.target.elements[1].value;

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      succesRegistration();
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      failedRegistration();
    });
}

//Функция авторизации
export function userAuthorization(event) {
  event.preventDefault();
  const email = event.target.elements[0].value;
  const password = event.target.elements[1].value;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      succesAuthorization();
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      failedAuthorization();
    });
}
