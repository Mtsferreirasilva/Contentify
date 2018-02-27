import $ from 'jquery';

const SEARCH_FIELD_CLASS = 'home-search-field';
const SEARCH_BUTTON_CLASS = 'home-search-button';

const CLASSES = {
  SEARCH_FIELD: 'home-search-field',
  SEARCH_FIELD_ERROR: 'home-search-field--error',
  SEARCH_BUTTON: 'home-search-button',
  SEARCH_BUTTON_DISABLED: 'home-search-button--disabled',
}

export default function homeSearch() {
  const searchField = $(`.${CLASSES.SEARCH_FIELD}`);
  const searchButton = $(`.${CLASSES.SEARCH_BUTTON}`);

  searchField.on('keyup', (evt) => {
    searchField.removeClass(CLASSES.SEARCH_FIELD_ERROR);
    searchField.val(searchField.val().trim());
    const isActive = searchField.val().length === 0;

    searchButton.prop('disabled', isActive);
    searchButton.toggleClass(CLASSES.SEARCH_BUTTON_DISABLED, isActive);

    if (evt.keyCode === 13) { openReader(searchField); }
  });
  searchButton.on('click', openReader.bind(null, searchField));
};

function openReader(searchField) {
  const searchURL = searchField.val(searchField.val().trim()).val();
  const urlRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  
  if (!urlRegex.test(searchURL)) { 
    searchField.addClass(CLASSES.SEARCH_FIELD_ERROR);
  } else {
    window.open(`/reader?url=${searchURL}`, '_blank');
    window.focus();
  }
}

