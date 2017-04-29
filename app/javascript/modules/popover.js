import $ from 'jquery';

const ACTIVATOR_DATA_ATT = 'popover-open';

const SPACING = 10;

const CLASSES = {
  CONTAINER: 'popover__container',
  BUTTON_GROUP: 'popover__button-group',
  OPEN: 'popover__container--open'
};

const CONTROLS_LIST_ITEM_CLASSES = {
  BASE: 'article-controls__list-item',
  ACTIVE: 'article-controls__list-item--actice'
}

export default function popover() {
  const $activatorNodes = $(`[data-${ACTIVATOR_DATA_ATT}]`);

  $activatorNodes.each((index, activator) => {
    const popover = $(activator).data().popoverOpen;
    const $popover = $(`[data-for='${popover}']`);

    $(activator).click(handleClick.bind(this, $popover));
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

// $(window).click(() => {
//   const $popoverContainerNodes = $(`.${CLASSES.CONTAINER}`);
//
//   closePopover($popoverContainerNodes);
// });
