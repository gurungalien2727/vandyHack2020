export function getFromStorage(key) {
  const val = localStorage.getItem(key);
  return JSON.parse(val);
}

export function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}
