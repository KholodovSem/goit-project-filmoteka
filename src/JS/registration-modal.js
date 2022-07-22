const userAccBtnRef = document.querySelector('.registration-btn');
const regModal = document.querySelector('.registration-modal');
const topCloseRegModalBtnRef = document.querySelector('.modal-btn');
const bottomCloseRegModalBtnRef = document.querySelector(
  '.tab-change-btn.cancel'
);
//

userAccBtnRef.addEventListener('click', openRegModal);
topCloseRegModalBtnRef.addEventListener('click', closeRegModal);
bottomCloseRegModalBtnRef.addEventListener('click', closeRegModal);

//
function openRegModal(e) {
  e.preventDefault();
  regModal.classList.add('modal-isVisible');
}

function closeRegModal(e) {
  e.preventDefault();
  regModal.classList.remove('modal-isVisible');
}
