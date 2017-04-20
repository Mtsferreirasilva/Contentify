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

  $iconNode.on('click', openSearch);
}

function openSearch(evt) {
  evt.preventDefault();

  const $iconNode = $(`.${CLASSES.ICON.BASE}`);
  const $inputNode = $(`.${CLASSES.INPUT.BASE}`);

  requestAnimationFrame(() => {
    $iconNode.addClass(CLASSES.ICON.CLOSED);
    $inputNode.addClass(CLASSES.INPUT.OPEN);
    $inputNode.focus();
  });
}

function closeSearch() {

  const $iconNode = $(`.${CLASSES.ICON.BASE}`);
  const $inputNode = $(`.${CLASSES.INPUT.BASE}`);

  requestAnimationFrame(() => {
    $iconNode.removeClass(CLASSES.ICON.CLOSED);
    $inputNode.removeClass(CLASSES.INPUT.OPEN);
  });
}

$(document).keyup((e) => {
   if (e.keyCode === 27) {
    closeSearch();
  }
});
