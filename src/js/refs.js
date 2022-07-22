export const refs = {
  movieContainer: document.querySelector('.films__gallery'),
  backToTopBtn: document.querySelector('.back-to-top-btn'),
  registrationModal: {
    regModal: document.querySelector('.registration-modal'),
    closeButtons: {
      userAccBtnRef: document.querySelector('.registration-btn'),
      topCloseRegModalBtnRef: document.querySelector('.modal-btn'),
      bottomCloseRegModalBtnRef: document.querySelector(
        '.tab-change-btn.cancel'
      ),
    },
    tabs: {
      signInTabRef: document.querySelector('[data-sign-in-tab]'),
      newAccTabRef: document.querySelector('[data-new-account-tab]'),
      newAccBoolean: false,
      signInBoolean: false,
    },
  },
};
