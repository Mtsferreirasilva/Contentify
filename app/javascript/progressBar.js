import $ from 'jquery';

const CLASSES = {
  BASE: 'progress-bar__level',
  ANIMATE: 'progress-bar__level--animate',
};

window.progressBar = function progressBar() {
  const $progressBarNode = $(`.${CLASSES.BASE}`);

  $progressBarNode.css('width', `${calculateProgress()}%`);
  $progressBarNode.on("transitionend", () => {
    $progressBarNode.removeClass(CLASSES.ANIMATE);
  });

  window.onscroll = windowEvent.bind(null, $progressBarNode);
  window.onresize = windowEvent.bind(null, $progressBarNode);
}

function windowEvent($progressBarNode) {
  $progressBarNode.css('width', `${calculateProgress()}%`);
}

function calculateProgress() {
  const endOfArticle = parseInt($('.article').css('margin-bottom').replace('px', ''));
  const documentHeight = $(document).height() - endOfArticle;
  const amountScrolled = $(window).height() + $(window).scrollTop();
  const progress = (amountScrolled) / documentHeight * 100;

  return progress.toFixed(2);
}
