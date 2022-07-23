const libraryMarkup = `<header class="header-section header-section-library">
  <div class="header__wrapper header__wrapper-libraty">
    <a href="./index.html" class="header__logo">
      <img src="../images/SVG/film.svg" alt="Logo" class="header__icon" />
    </a>
    <p class="filmoteka">Filmoteka</p>
    <nav class="header__nav">
      <ul class="header__link-list">
        <li class="header__item">
          <button class="header__link" data-link-home>HOME</button>
        </li>
        <li class="header__item">
          <button class="header__link active" data-link-library
            >MY LIBRARY</button
          >
        </li>
      </ul>
    </nav>
  </div>
  <div class="header__wrapper-btn">
    <button class="header__btn">WATCHED</button>
    <button class="header__btn">QUEUE</button>
  </div>
</header>
`;

export function renderLibraryMarkup(event, element) {
  event.preventDefault();
  element.innerHTML = libraryMarkup;
}
