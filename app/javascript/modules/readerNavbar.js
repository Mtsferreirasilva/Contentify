import $ from 'jquery';

const CONTROLS_CLASSES = {
  BASE: 'article-controls',
  SHADOW: 'article-controls--shadow',
};

const CONTROLS_LIST_CLASSES = {
  BASE: 'article-controls__list',
  STATE: {
    FIXED: 'article-controls__list--fixed',
    FADED: 'article-controls__list--faded'
  }
};

export default function readerNavbar() {
  const $constrolsNode = $(`.${CONTROLS_CLASSES.BASE}`);
  const $itemsNode = $(`.${CONTROLS_LIST_CLASSES.BASE}`);

  $(window).on('scroll', windowEvent.bind(null, $constrolsNode));
  $(window).on('resize', windowEvent.bind(null, $constrolsNode));
}

function windowEvent($constrolsNode) {
  if ($(window).width() < 1000 && $(window).scrollTop() > 0) {
    $constrolsNode.addClass(CONTROLS_CLASSES.SHADOW);
  } else {
    $constrolsNode.removeClass(CONTROLS_CLASSES.SHADOW);
  }
}
