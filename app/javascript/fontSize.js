import $ from 'jquery';

const CLASSES = {
  ARTICLE: 'article',
  SIZE: 'article--font-size-'
};

const FONT_SIZE_CONTROLS_ID = 'font-size-controls';

window.fontSize = function fontSize() {
  const $articleNode = $(`.${CLASSES.ARTICLE}`);
  const $buttons = $(`#${FONT_SIZE_CONTROLS_ID} button`);

  $buttons.each((index, button) => {
    const value = $(button).data('value');

    $(button).click(updateArticleFontSize.bind(null, $articleNode, value));
  });
}

function updateArticleFontSize($articleNode, value) {
  if (!$articleNode.hasClass(`${CLASSES.SIZE}${value}`)) {
    $articleNode.removeClass((index, className) => {
      return (className.match(/(^|\s)article--font-size-\S+/g) || []).join(' ');
    });
    $articleNode.addClass(`${CLASSES.SIZE}${value}`);
  }
}
