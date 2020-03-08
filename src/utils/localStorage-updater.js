export default function localStorageUpdater(keyLS, data, setData) {
  localStorage.removeItem(keyLS);
  localStorage.setItem(keyLS, JSON.stringify(data));
  setData(data);
}
