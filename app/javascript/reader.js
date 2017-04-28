import progressBar from './modules/progressBar';
import readerNavbar from './modules/readerNavbar';
import popover from './modules/popover';
import fontSize from './modules/fontSize';

window.reader = function reader() {
  progressBar();
  readerNavbar();
  popover();
  fontSize();
}
