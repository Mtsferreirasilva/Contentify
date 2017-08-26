export function setSettings(obj) {
  localStorage.setItem('contentify', JSON.stringify(obj));
}

export function getSettings() {
  const storedItem = localStorage.getItem('contentify');
  return storedItem ? JSON.parse(storedItem) : {};
}
