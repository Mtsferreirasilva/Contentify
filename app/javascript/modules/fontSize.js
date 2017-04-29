import $ from 'jquery';

const CLASSES = {
  ARTICLE: 'article',
  SIZE: 'article--font-size-'
};

const BUTTON_ACTIVE_CLASS = 'popover__button--active';

const FONT_SIZE_CONTROLS_ID = 'font-size-controls';

let $buttons;

export default function fontSize() {
  const $articleNode = $(`.${CLASSES.ARTICLE}`);
  $buttons = $(`#${FONT_SIZE_CONTROLS_ID} button`);

  $buttons.each((index, button) => {
    const $button = $(button);
    const value = $button.data('value');

    $button.click(updateArticleFontSize.bind($button, $articleNode, value));
  });
}

function updateArticleFontSize($articleNode, value) {
  const $button = $(this);

  clearAll();

  $button.addClass(BUTTON_ACTIVE_CLASS);

  if (!$articleNode.hasClass(`${CLASSES.SIZE}${value}`)) {
    $articleNode.removeClass((index, className) => {
      return (className.match(/(^|\s)article--font-size-\S+/g) || []).join(' ');
    });
    $articleNode.addClass(`${CLASSES.SIZE}${value}`);
  }
}

function clearAll() {
  $buttons.each((index, button) => {
    $(button).removeClass(BUTTON_ACTIVE_CLASS);
  });
}
