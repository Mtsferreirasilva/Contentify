import $ from 'jquery';
import _ from 'lodash';

const CONTROLS_CLASSES = {
  BASE: 'article-controls',
  SCROLLED: 'article-controls--border',
};

const CONTROLS_LIST_CLASSES = {
  BASE: 'article-controls__list',
  STATE: {
    FIXED: 'article-controls__list--fixed',
    FADED: 'article-controls__list--faded'
  }
};

const ARTICLE_CONTENT_CLASS = 'article__content';

const SPACING_BEFORE_CONTROLS = 60;

let lastScrollPosition;
let canBeFidexOffset;

export default function readerNavbar() {
  const $constrolsNode = $(`.${CONTROLS_CLASSES.BASE}`);
  const $listNode = $(`.${CONTROLS_LIST_CLASSES.BASE}`);
  const options = {
    listNodeOffsetTop: $listNode.offset().top
  };

  lastScrollPosition = $(window).scrollTop();
  canBeFidexOffset = $(`.${ARTICLE_CONTENT_CLASS}`).offset().top - 50;

  $(window).on('scroll', windowEvent.bind(null, $constrolsNode, $listNode, options));
  $(window).on('resize', _.debounce(windowEvent.bind(null, $constrolsNode, $listNode, options), 10));
  $(window).trigger('scroll');
}

function windowEvent($constrolsNode, $listNode, options = {}) {
  if ($(window).width() >= 1024) {
    $constrolsNode.removeClass(CONTROLS_CLASSES.SCROLLED);

    handleDesktop($listNode, options.listNodeOffsetTop);
  } else {
    $listNode.removeClass(CONTROLS_LIST_CLASSES.STATE.FIXED);
    $listNode.removeClass(CONTROLS_LIST_CLASSES.STATE.FADED);

    handleMobile($constrolsNode);
  }
}

function handleDesktop($listNode, listNodeOffsetTop) {
  const offsetedScrollTop = $(window).scrollTop() + SPACING_BEFORE_CONTROLS;

  requestAnimationFrame(() => {
    if (offsetedScrollTop > listNodeOffsetTop) {
      // when it should be fixed code
      $listNode.addClass(CONTROLS_LIST_CLASSES.STATE.FIXED);

      handleDesktopScrollDirections($listNode);
    } else {
      // when it should be static code
      $listNode.removeClass(CONTROLS_LIST_CLASSES.STATE.FIXED);
    }
  });
}

function handleDesktopScrollDirections($listNode) {
  if ($(window).scrollTop() > lastScrollPosition && $(window).scrollTop() > canBeFidexOffset){
    // downscroll code
    $listNode.addClass(CONTROLS_LIST_CLASSES.STATE.FADED);
  } else {
     // upscroll code
     $listNode.removeClass(CONTROLS_LIST_CLASSES.STATE.FADED);
  }
  lastScrollPosition = $(window).scrollTop();
}

function handleMobile($constrolsNode) {
  requestAnimationFrame(() => {
    if ($(window).scrollTop() > 0) {
      $constrolsNode.addClass(CONTROLS_CLASSES.SCROLLED);
    } else {
      $constrolsNode.removeClass(CONTROLS_CLASSES.SCROLLED);
    }
  });
}
