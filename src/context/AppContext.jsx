import { createContext, useContext, useState } from 'react';
import { SCREENS } from '../utils/constants';

/**
 * AppContext
 * Provides global state management for navigation and shared app state
 */
const AppContext = createContext();

/**
 * Custom hook to use the AppContext
 * @throws {Error} if used outside of AppProvider
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

/**
 * AppProvider Component
 * Wraps the application and provides context
 */
export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  const navigateHome = () => {
    setCurrentScreen(SCREENS.HOME);
  };

  const value = {
    currentScreen,
    setCurrentScreen,
    navigateTo,
    navigateHome,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
