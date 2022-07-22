import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const userReg = e => {
  e.preventDefault();
  const userEmail = e.target.elements[0].value;
  const userPassword = e.target.elements[1].value;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then(userCredential => {
      const user = userCredential.user;
      console.log('Welcome');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};
