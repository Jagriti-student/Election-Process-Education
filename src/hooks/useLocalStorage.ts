import { useState } from 'react';
import { googleLogger } from '../services/GoogleCloudService';

/**
 * Custom hook for synchronizing state with window.localStorage.
 * @template T
 * @param {string} key - The localStorage key to use.
 * @param {T} initialValue - The fallback value if the key doesn't exist.
 * @returns {[T, (value: T) => void]} A stateful value and a function to update it.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      googleLogger.error('Error reading from localStorage', { key, error: String(error) });
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      googleLogger.error('Error writing to localStorage', { key, error: String(error) });
    }
  };

  return [storedValue, setValue];
}

