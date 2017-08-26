import { getSettings } from './lib/localStorage';
import { isUserSignedIn } from './lib/user';
import progressBar from './modules/progressBar';
import readerNavbar from './modules/readerNavbar';
import popover from './modules/popover';
import fontSize from './modules/fontSize';
import theme from './modules/theme';
import removeLoadingPage from './modules/removeLoadingPage';
import fab from './modules/fab';

const BUTTON_CLASS = 'popover__button';
const ARTICLE_CONTROLS_LIST_ITEM_CLASS = 'article-controls__list-item';

window.Contentify.Reader = class Reader {
  constructor() {
    fontSize();
    theme();
    progressBar();
    readerNavbar();
    popover(ARTICLE_CONTROLS_LIST_ITEM_CLASS);
    fab();
    if (!isUserSignedIn()) {
      this.updateSettingsFromLocalStorage();
    }
    removeLoadingPage();
  }

  updateSettingsFromLocalStorage() {
    const settings = getSettings();
    if (Object.keys(settings).length > 0) {
      $(`.${BUTTON_CLASS}`).filter(`[data-value=${settings.font_size}]`).click();
      $(`.${BUTTON_CLASS}`).filter(`[data-value=${settings.theme}]`).click();
    }
  }
}
