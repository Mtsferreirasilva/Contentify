import $ from 'jquery';

const TARGET = 'body';

const CLASSES = {
  DARK_THEME: 'dark-theme'
};

const THEME_CONTROLS_ID = 'theme-controls';

export default function theme() {
  const $targetNode = $(`${TARGET}`);
  const $buttons = $(`#${THEME_CONTROLS_ID} button`);

  $buttons.each((index, button) => {
    const value = $(button).data('value');

    $(button).click(updateTheme.bind(null, $targetNode, value));
  });
}

function updateTheme($targetNode, value) {
  if (value === 'dark') {
    $targetNode.addClass(CLASSES.DARK_THEME);
  } else {
    $targetNode.removeClass(CLASSES.DARK_THEME);
  }
}
