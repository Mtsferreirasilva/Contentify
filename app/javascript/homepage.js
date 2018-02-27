import homeSearch from './modules/homeSearch';

window.Contentify.Homepage = class Homepage {
  constructor() {
    homeSearch();
  }
}
