import popover from './modules/popover';
import fontSize from './modules/fontSize';
import theme from './modules/theme';
import fab from './modules/fab';

window.Library = class Library {
  constructor() {
    fontSize();
    theme();
    popover('navbar__controls-item');
    fab();
  }
}
