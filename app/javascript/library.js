import popover from './modules/popover';
import fontSize from './modules/fontSize';
import theme from './modules/theme';
import fab from './modules/fab';

window.Contentify.Library = class Library {
  constructor() {
    fontSize();
    theme();
    popover('navbar__controls-item');
    fab();
  }
}
