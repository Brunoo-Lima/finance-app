import { useState, useEffect } from "react";

function isBrowser() {
  return typeof window !== "undefined";
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser()) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // handle error
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
