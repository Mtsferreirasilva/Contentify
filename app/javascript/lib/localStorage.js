export function setSettings(obj) {
  localStorage.setItem('contentify', JSON.stringify(obj));
}

export function getSettings() {
  return JSON.parse(localStorage.getItem('contentify'));
}
