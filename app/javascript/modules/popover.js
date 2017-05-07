import $ from 'jquery';

const ACTIVATOR_DATA_ATT = 'popover-open';

const SPACING = 10;

const CLASSES = {
  CONTAINER: 'popover__container',
  BUTTON_GROUP: 'popover__button-group',
  BUTTON: 'popover__button',
  OPEN: 'popover__container--open'
};

let CONTROLS_LIST_ITEM_CLASSES = {};

export default function popover(controlsListBaseClass) {
  CONTROLS_LIST_ITEM_CLASSES = {
    BASE: controlsListBaseClass,
    ACTIVE: `${controlsListBaseClass}--active`
  };

  const $activatorNodes = $(`[data-${ACTIVATOR_DATA_ATT}]`);

  $activatorNodes.each((index, activator) => {
    const popover = $(activator).data().popoverOpen;
    const $popover = $(`[data-for='${popover}']`);

    $(activator).on('click', handleClick.bind(null, $popover));
  });
}

function handleClick($popover) {
  event.stopPropagation();

  const $popoverContainerNodes = $(`.${CLASSES.CONTAINER}`);
  const $container = $popover.find(`.${CLASSES.CONTAINER}`);
  const $listItemNode = $popover.closest(`.${CONTROLS_LIST_ITEM_CLASSES.BASE}`);

  closePopover($popoverContainerNodes, $container);
  $listItemNode.toggleClass(CONTROLS_LIST_ITEM_CLASSES.ACTIVE);
  $container.toggleClass(CLASSES.OPEN);
}

function closePopover($popoverContainerNodes, $container = false) {
  $popoverContainerNodes.each((index, popoverContainer) => {
    const $popoverContainer = $(popoverContainer);
    const $listItemNode = $popoverContainer.closest(`.${CONTROLS_LIST_ITEM_CLASSES.BASE}`);

    if (!$container) {
      $popoverContainer.removeClass(CLASSES.OPEN);
      $listItemNode.removeClass(CONTROLS_LIST_ITEM_CLASSES.ACTIVE);
    } else if ($popoverContainer.parent().data().for !== $container.parent().data().for) {
      $popoverContainer.removeClass(CLASSES.OPEN);
      $listItemNode.removeClass(CONTROLS_LIST_ITEM_CLASSES.ACTIVE);
    }
  });
}

$(window).on('click', (e) => {
  const $popoverContainerNodes = $(`.${CLASSES.CONTAINER}`);
  const $popoverButtonNodes = $(`.${CLASSES.BUTTON}`);

  let clickContainsControls = false;

  $popoverButtonNodes.each((index, button) => {
    if (button.contains(e.target)) { clickContainsControls = true; }
  });

  if (!clickContainsControls) {
    closePopover($popoverContainerNodes);
  }
});
