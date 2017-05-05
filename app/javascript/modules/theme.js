import $ from 'jquery';

import updateSettings from './updateSettings';

const TARGET = 'body';

const CLASSES = {
  DARK_THEME: 'dark-theme'
};

const BUTTON_ACTIVE_CLASS = 'popover__button--active';

const THEME_CONTROLS_ID = 'theme-controls';

let $buttons;

export default function theme() {
  const $targetNode = $(`${TARGET}`);
  $buttons = $(`#${THEME_CONTROLS_ID} button`);

  $buttons.each((index, button) => {
    const $button = $(button);
    const value = $button.data('value');

    $button.click(updateTheme.bind($button, $targetNode, value));
  });
}

function updateTheme($targetNode, value) {
  const $button = $(this);

  clearAll();

  $button.addClass(BUTTON_ACTIVE_CLASS);
  $('meta[name=theme-color]').remove();

  if (value === 'dark') {
    $('head').append('<meta name="theme-color" content="#222222">');
    $targetNode.addClass(CLASSES.DARK_THEME);
  } else {
    $('head').append('<meta name="theme-color" content="#FFFFFF">');
    $targetNode.removeClass(CLASSES.DARK_THEME);
  }
  updateSettings();
}

function clearAll() {
  $buttons.each((index, button) => {
    $(button).removeClass(BUTTON_ACTIVE_CLASS);
  });
}
