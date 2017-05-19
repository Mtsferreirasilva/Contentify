let initModules;

window.Page = (setup = () => ({})) => {
  initModules = setup;
}

function reset() {
  if (initModules != null) {
    initModules();
    initModules = null;
  }
}

document.addEventListener('turbolinks:load', reset);
