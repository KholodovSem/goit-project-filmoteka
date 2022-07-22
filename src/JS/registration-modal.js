//Функции
export function openRegModal(event, element) {
  event.preventDefault();
  element.classList.add('modal-isVisible');
}

export function closeRegModal(event, element) {
  event.preventDefault();
  element.classList.remove('modal-isVisible');
}

export function changeTabInModal(event, firstElement, secondElement) {
  event.preventDefault();

  firstElement.classList.toggle('active');
  firstElement.classList.toggle('non-active');

  secondElement.classList.toggle('active');
  secondElement.classList.toggle('non-active');
}
