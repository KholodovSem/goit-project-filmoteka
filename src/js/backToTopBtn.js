import { refs } from './refs';

export function scrollTo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function scrollToTopButton() {
  if (window.scrollY > window.innerHeight / 2) {
    refs.backToTopBtn.classList.remove('visually-hidden');
  } else {
    refs.backToTopBtn.classList.add('visually-hidden');
  }
}
