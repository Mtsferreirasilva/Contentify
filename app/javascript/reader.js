import progressBar from './modules/progressBar';
import readerNavbar from './modules/readerNavbar';
import popover from './modules/popover';
import fontSize from './modules/fontSize';
import theme from './modules/theme';
import removeLoadingPage from './modules/removeLoadingPage';
import fab from './modules/fab';

window.Reader = class Reader {
  constructor() {
    fontSize();
    theme();
    progressBar();
    readerNavbar();
    popover();
    fab();
    removeLoadingPage();
  }
}
