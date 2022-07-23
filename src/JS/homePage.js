const homeMarkup = `<header class="header-section">
  <div class="header__wrapper">
    <a href="./index.html" class="header__logo">
      <img src="./images/SVG/film.svg" alt="Logo" class="header__icon" />
    </a>
    <p class="filmoteka">Filmoteka</p>
    <nav class="header__nav">
      <ul class="header__link-list">
        <li class="header__item" data-navigation-link>
          <button class="header__link active disabled" data-link-home>
            HOME
          </button>
        </li>
        <li class="header__item" data-navigation-link>
          <button class="header__link disabled" data-link-library>
            MY LIBRARY
          </button>
        </li>
        <li>
          <button class="registration-btn">
            <img
              src="./images/SVG/avatar.svg"
              alt="Registration"
              width="28px"
              height="28px"
            />
          </button>
        </li>
      </ul>
    </nav>
  </div>
  <div class="headerinput-wrapper">
    <form class="form">
      <label for="" class="headerlabel">
        <input type="text" class="headerinput" placeholder="Movie search" />
        <img
          src="./images/SVG/search.svg"
          alt="Icon search"
          class="headerinput-icon"
        />
      </label>
      <button type="submit">F</button>
    </form>
  </div>
</header>`;

export function renderHomeMarkup(event, element) {
  event.preventDefault();
  element.innerHTML = homeMarkup;
}
