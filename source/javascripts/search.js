// Search
const searchModal = document.getElementById('search-modal');
const searchBtn = document.querySelector('.button--open-search');
const closeSearchBtn = document.querySelector('.close-modal');
const inputField = document.querySelector('#search-modal input[type="search"]');
const focusableSearchElements = searchModal?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

const openSearch = () => {
  if (searchModal && inputField) {
    document.addEventListener("click", clickOutsideToClose);
    document.addEventListener('keydown', closeSearchOnEscape);
    searchModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overlay-open');
    searchModal.addEventListener("transitionend", focusInputField, { once: true });
    trapSearchFocus();
  }
};

const trapSearchFocus = () => {
  const firstFocusableElement = focusableSearchElements[0];
  const lastFocusableElement = focusableSearchElements[focusableSearchElements.length - 1];

  // Focus first element
  firstFocusableElement.focus();

  // Trap focus inside modal
  searchModal.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' || event.keyCode === 9) {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  });
};

const clickOutsideToClose = (e) => {
  if (e.target === searchModal) {
    closeSearch();
  }
};

const closeSearch = () => {
  if (searchModal && searchModal.getAttribute('aria-hidden') === 'false') {
    searchModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overlay-open');
    document.removeEventListener("click", clickOutsideToClose);
    document.removeEventListener('keydown', closeSearchOnEscape);
    searchModal.addEventListener("transitionend", focusSearchButton, { once: true });
  }
};

const closeSearchOnEscape = (event) => {
  if (event.key === 'Escape' || event.code === 27) {
    closeSearch();
  }
};

const focusInputField = () => {
  inputField.focus();
};

const focusSearchButton = () => {
  searchBtn.focus();
};

searchBtn?.addEventListener('click', openSearch);
closeSearchBtn?.addEventListener('click', closeSearch);