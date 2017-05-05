import $ from 'jquery';

const SETTINGS = {
  ID: 'settings',
  FONT_SIZE: 'font_size',
  THEME: 'theme'
}

const BUTTON_ACTIVE_CLASS = 'popover__button--active';

export default function updateSettings() {
  const $settingsNode = $(`#${SETTINGS.ID}`);
  const $settingsForm = $settingsNode.parent();

  const $fontSizeIdNode = $settingsNode.find(`#${SETTINGS.FONT_SIZE}`);
  const $themeIdNode = $settingsNode.find(`#${SETTINGS.THEME}`);

  const currentSettings = $(`.${BUTTON_ACTIVE_CLASS}`).map((index, element) => $(element).data('value'));
  const fontSizeValue = currentSettings[0];
  const themeValue = currentSettings[1];

  $fontSizeIdNode.val(fontSizeValue);
  $themeIdNode.val(themeValue);

  sendRequest($settingsForm);
}

function sendRequest($form) {
  const token = $form.find('[name="authenticity_token"]').attr('value');

  $.ajax({
    type: "POST",
    beforeSend: (request) => {
      request.setRequestHeader("X-CSRF-Token", token);
    },
    url: "/settings",
    data: $form.serialize()
  }).done((data) => {
    // console.log(data.status);
  })
  .fail((data) => {
    console.error('Error:', data.status);
  });
}
