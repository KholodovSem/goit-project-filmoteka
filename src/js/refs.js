export const refs = {
  movieContainer: document.querySelector('.films__gallery'),
  backToTopBtn: document.querySelector('.back-to-top-btn'),
  openModalBtn: document.querySelector('.films__gallery'),
  closeModalBtn: document.querySelector('.js-close-button'),
  modal: document.querySelector('.js-backdrop'),
  body: document.querySelector('body'),
  movieOneCardContainer: document.querySelector('.films__gallery'),
  cardModalMovie: document.querySelector('.js-modal-card'), //на один фильм
  backdropMovie: document.querySelector('.movie-backdrop'),
  registrationModal: {
    regModal: document.querySelector('.registration-modal'),
    form: document.querySelector('.registration-form'),
    closeButtons: {
      userAccBtnRef: document.querySelector('.registration-btn'),
      topCloseRegModalBtnRef: document.querySelector('.modal-btn'),
      bottomCloseRegModalBtnRef: document.querySelector(
        '.tab-change-btn.cancel'
      ),
      loginButton: document.querySelector('[data-login-button]'),
    },
    tabs: {
      signInTabRef: document.querySelector('[data-sign-in-tab]'),
      newAccTabRef: document.querySelector('[data-new-account-tab]'),
      newAccBoolean: false,
      signInBoolean: true,
    },
  },
  navigation: {
    homeLink: document.querySelector('[data-link-home]'),
    libraryLink: document.querySelector('[data-link-library]'),
  },
  form: document.querySelector('.form'),
  input: document.querySelector('input'),
  pagination: document.querySelector('#pagination1'),
};
