export const getStorageItem = <T>(key: string): T | undefined => {
  const data = localStorage.getItem(key);
  if (!data) {
    return undefined;
  }
  return JSON.parse(data) as T;
}

export const setStorageItem = <T>(key: string, data: T): void => {
  const dataString = JSON.stringify(data);
  localStorage.setItem(key, dataString);
}

export const deleteStorageItem = (key: string): void => {
  localStorage.removeItem(key);
}