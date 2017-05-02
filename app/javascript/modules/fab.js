import $ from 'jquery';

const CLASSES = {
  BASE: 'fab',
  COLLAPSED: 'fab--collapsed',
  MODAL_OPEN: 'fab-modal--open',
  MODAL_BUTTON: 'fab-modal__button'
};

const ROLE_ATTR = 'fab-role';
const ACTIVATE_MODAL_ATTR = 'fab-activate-modal';
const MODAL_FOR_ATTR = 'fab-modal-for';

export default function fab() {
  const $fabNode = $(`.${CLASSES.BASE}`);
  const $fabModalButton = $(`.${CLASSES.MODAL_BUTTON}`);

  $fabNode.click(handleClick.bind($fabNode));
  $fabModalButton.click(handleClose.bind($fabNode));
}

function handleClose() {
  const $fabNode = $(this);
  const fabRole = $fabNode.data(ROLE_ATTR);
  const $fabModalNode = $(`[data-${MODAL_FOR_ATTR}="${fabRole}"]`);

  requestAnimationFrame(() => {
    $fabModalNode.removeClass(CLASSES.MODAL_OPEN);
  });
}

function handleClick(event) {
  event.preventDefault();

  const $fabNode = $(this);
  const fabRole = $fabNode.data(ROLE_ATTR);
  const activateModal = $fabNode.data(ACTIVATE_MODAL_ATTR);

  if (activateModal) {
    const $fabModalNode = $(`[data-${MODAL_FOR_ATTR}="${fabRole}"]`);
    const fabOffset = $fabNode.offset();

    showModal($fabModalNode, fabOffset);
  } else {
    performFabAction(fabRole);
  }
}

function showModal($fabModalNode, fabOffset) {
  requestAnimationFrame(() => {
    $fabModalNode.addClass(CLASSES.MODAL_OPEN);
  });
}

function performFabAction(fabRole) {
  switch (fabRole) {
    case 'save-page':
      savePage();
      break;
    default:
      return;
  }
}

function savePage() {
  const $fabNode = $(`.${CLASSES.BASE}`);
  const $fabForm = $fabNode.closest('form');

  $.post("/reader/save_article", $fabForm.serialize())
    .done((data) => {
      console.log(data.status);
      $fabNode.addClass(CLASSES.COLLAPSED);
    })
    .fail((data) => {
      alert(data.status);
    });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
