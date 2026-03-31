import { useState, useEffect } from 'react';

/**
 * Custom hook for managing dark mode state
 * Persists preference in localStorage
 */
export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Initialize dark mode from localStorage on mount
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    const isDark = storedDarkMode === null ? true : storedDarkMode === 'true';
    setDarkMode(isDark);
  }, []);

  // Update document class and localStorage when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return { darkMode, toggleDarkMode };
};
