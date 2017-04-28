import $ from 'jquery';

const CLASSES = {
  BASE: 'article-controls',
  SHADOW: 'article-controls--shadow',
};

export default function readerNavbar() {
  const $articleControlsNode = $(`.${CLASSES.BASE}`);

  $(window).on('scroll', windowEvent.bind(null, $articleControlsNode));
  $(window).on('resize', windowEvent.bind(null, $articleControlsNode));
}

function windowEvent($articleControlsNode) {
  if ($(window).width() < 1000 && $(window).scrollTop() > 0) {
    $articleControlsNode.addClass(CLASSES.SHADOW);
  } else {
    $articleControlsNode.removeClass(CLASSES.SHADOW);
  }
}