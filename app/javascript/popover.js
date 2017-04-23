import $ from 'jquery';

const ACTIVATOR_DATA_ATT = 'popover-open';

const SPACING = 10;

const CLASSES = {
  CONTAINER: 'popover__container',
  BUTTON_GROUP: 'popover__button-group',
  OPEN: 'popover__container--open',
};

window.popover = function popover() {
  const $activatorNodes = $(`[data-${ACTIVATOR_DATA_ATT}]`);

  $activatorNodes.each((index, activator) => {
    const popover = $(activator).data().popoverOpen;
    const $popover = $(`[data-for='${popover}']`);

    $(activator).click(handleClick.bind(null, $popover));
  });
}

function handleClick($popover) {
  const $popoverContainerNodes = $(`.${CLASSES.CONTAINER}`);
  const $container = $popover.find(`.${CLASSES.CONTAINER}`);
  const $buttonGroup = $popover.find(`.${CLASSES.BUTTON_GROUP}`);
  const containerWidth = $buttonGroup.width() + SPACING;
  const containerHeight = $buttonGroup.height() + SPACING;

  $popoverContainerNodes.each((index, popoverContainer) => {
    const $popoverContainer = $(popoverContainer);

    if ($popoverContainer.parent().data().for !== $container.parent().data().for) {
      $popoverContainer.removeClass(CLASSES.OPEN);
      $popoverContainer.css({ width: 0, height: 0 });
    }
  });

  if ($container.hasClass(CLASSES.OPEN)) {
    $container.removeClass(CLASSES.OPEN);
    $container.css({ width: 0, height: 0 });
  } else {
    $container.addClass(CLASSES.OPEN);
    $container.css({
      width: `${containerWidth}px`,
      height: `${containerHeight}px`
    });
  }
}
