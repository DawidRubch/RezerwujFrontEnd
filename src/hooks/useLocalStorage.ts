import { useState } from "react";

interface IuseLocalStorage<T> {
  key: LocalStorageKeys;
  initialValue: T;
}

export const useLocalStorage = <T>({
  key,
  initialValue,
}: IuseLocalStorage<T>) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {}
  };

  return { storedValue, setValue };
};
