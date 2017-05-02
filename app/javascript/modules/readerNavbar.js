import $ from 'jquery';
import _ from 'lodash';

const FAB_CLASSES = {
  BASE: 'fab',
  SCROLLED: 'fab--scrolled'
}

const CONTROLS_CLASSES = {
  BASE: 'article-controls',
  BORDER: 'article-controls--border',
  SCROLLED: 'article-controls--scrolled'
};

const CONTROLS_LIST_CLASSES = {
  BASE: 'article-controls__list',
  STATE: {
    FIXED: 'article-controls__list--fixed',
    FADED: 'article-controls__list--faded'
  }
};

const ARTICLE_LEAD_IMAGE_CLASS = 'article__lead-image';

const SPACING_BEFORE_CONTROLS = 60;

let lastScrollPosition;
let canBeFixedOffset;

export default function readerNavbar() {
  const $leadImageNode = $(`.${ARTICLE_LEAD_IMAGE_CLASS}`);
  const $constrolsNode = $(`.${CONTROLS_CLASSES.BASE}`);
  const $listNode = $(`.${CONTROLS_LIST_CLASSES.BASE}`);
  const $fabNode = $(`.${FAB_CLASSES.BASE}`);
  const options = {
    listNodeOffsetTop: $listNode.offset().top
  };

  lastScrollPosition = $(window).scrollTop();

  // Can be fixed only after half the lead image is past
  if ($leadImageNode.length === 0) {
    canBeFixedOffset = 200;
  } else {
    canBeFixedOffset = $leadImageNode.offset().top + ($leadImageNode.height() / 2);
  }

  $(window).on('scroll', windowEvent.bind(null, $constrolsNode, $listNode, $fabNode, options));
  $(window).on('resize', _.debounce(windowEvent.bind(null, $constrolsNode, $listNode, $fabNode, options), 10));
  $(window).trigger('scroll');
}

function windowEvent($constrolsNode, $listNode, $fabNode, options = {}) {
  if ($(window).width() >= 1024) {
    // Reseting nodes
    $constrolsNode.removeClass(CONTROLS_CLASSES.BORDER);

    handleDesktop($listNode, $fabNode, options.listNodeOffsetTop);
  } else {
    // Reseting nodes
    $listNode.removeClass(CONTROLS_LIST_CLASSES.STATE.FIXED);
    $listNode.removeClass(CONTROLS_LIST_CLASSES.STATE.FADED);

    handleMobile($constrolsNode, $fabNode);
  }
}

// DESKTOP ========================================================================

function handleDesktop($listNode, $fabNode, listNodeOffsetTop) {
  const offsetedScrollTop = $(window).scrollTop() + SPACING_BEFORE_CONTROLS;

  requestAnimationFrame(() => {
    if (offsetedScrollTop > listNodeOffsetTop) {
      // when it should be fixed code
      $listNode.addClass(CONTROLS_LIST_CLASSES.STATE.FIXED);

      handleDesktopScrollDirections($listNode, $fabNode);
    } else {
      // when it should be static code
      $listNode.removeClass(CONTROLS_LIST_CLASSES.STATE.FIXED);
    }
  });
}

function handleDesktopScrollDirections($listNode, $fabNode) {
  if ($(window).scrollTop() > lastScrollPosition && $(window).scrollTop() > canBeFixedOffset) {
    // downscroll
    $fabNode.addClass(FAB_CLASSES.SCROLLED);
    $listNode.addClass(CONTROLS_LIST_CLASSES.STATE.FADED);
  } else {
    // upscroll code
    $fabNode.removeClass(FAB_CLASSES.SCROLLED);
    $listNode.removeClass(CONTROLS_LIST_CLASSES.STATE.FADED);
  }
  lastScrollPosition = $(window).scrollTop();
}

// MOBILE ========================================================================

function handleMobile($constrolsNode, $fabNode) {
  requestAnimationFrame(() => {
    if ($(window).scrollTop() > 0) {
      $constrolsNode.addClass(CONTROLS_CLASSES.BORDER);
    } else {
      $constrolsNode.removeClass(CONTROLS_CLASSES.BORDER);
    }
  });

  handleMobileScrollDirections($constrolsNode, $fabNode);
}

function handleMobileScrollDirections($constrolsNode, $fabNode) {
  if ($(window).scrollTop() > lastScrollPosition && $(window).scrollTop() > canBeFixedOffset) {
    // downscroll
    $fabNode.addClass(FAB_CLASSES.SCROLLED);
    $constrolsNode.addClass(CONTROLS_CLASSES.SCROLLED);
  } else {
    // upscroll code
    $fabNode.removeClass(FAB_CLASSES.SCROLLED);
    $constrolsNode.removeClass(CONTROLS_CLASSES.SCROLLED);
  }
  lastScrollPosition = $(window).scrollTop();
}
