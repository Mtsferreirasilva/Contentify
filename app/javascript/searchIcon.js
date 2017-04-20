import $ from 'jquery';

const CLASSES = {
  ICON: {
    BASE: 'search-icon',
    CLOSED: 'search-icon--closed'
  },
  INPUT: {
    BASE: 'search__input',
    OPEN: 'search__input--open',
  },
};

export default function searchIcon(){
  const $iconNode = $(`.${CLASSES.ICON.BASE}`);

  $iconNode.on('click', toggleSearch);
}

function toggleSearch(evt) {
  if (evt !== undefined) {
    evt.preventDefault();
  }

  const $inputNode = $(`.${CLASSES.INPUT.BASE}`);

  requestAnimationFrame(() => {
    $inputNode.toggleClass(CLASSES.INPUT.OPEN);
    $inputNode.focus();
  });
}

function openSearch() {
  const $inputNode = $(`.${CLASSES.INPUT.BASE}`);

  requestAnimationFrame(() => {
    $inputNode.addClass(CLASSES.INPUT.OPEN);
    $inputNode.focus();
  });
}

function closeSearch() {
  const $inputNode = $(`.${CLASSES.INPUT.BASE}`);

  requestAnimationFrame(() => {
    $inputNode.removeClass(CLASSES.INPUT.OPEN);
    $inputNode.blur();
  });
}

$(document).keyup((e) => {
   if (e.keyCode === 191) {
    openSearch();
  } else if (e.keyCode === 27) {
    closeSearch();
  }
});
