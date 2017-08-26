import popover from './modules/popover';
import fontSize from './modules/fontSize';
import theme from './modules/theme';
import fab from './modules/fab';

const NAVBAR_CONTROLS_ITEM_CLASS = 'navbar__controls-item'

window.Contentify.Library = class Library {
  constructor() {
    fontSize();
    theme();
    popover(NAVBAR_CONTROLS_ITEM_CLASS);
    fab();
  }
}
