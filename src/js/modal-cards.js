import { refs } from '../js/refs';
import { addNameFilmByQueueOrWatchedListener } from '../JS/localStorage';
const { movieContainer, closeModalBtn, modal, body } = refs;

const modalCardRef = document.querySelector('.modal__container');

movieContainer.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', closeModal);

function closeEmptyField(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal();
  }
}
function showModal(evt) {
  evt.preventDefault();

  modal.addEventListener('click', closeEmptyField);
  if (evt.target.tagName !== 'UL') {
    document.addEventListener('keydown', closeEsc);
    body.classList.add('modal-open');
    modal.classList.toggle('is-hidden');
  }
}
function closeModal() {
  modal.removeEventListener('click', closeEmptyField);
  modal.classList.toggle('is-hidden');
  document.removeEventListener('keydown', closeEsc);
  body.classList.remove('modal-open');
  refs.cardModalMovie.innerHTML = '';
  modalCardRef.removeEventListener(
    'click',
    addNameFilmByQueueOrWatchedListener
  );
}

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}
