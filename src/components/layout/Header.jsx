import { Moon, Sun } from 'lucide-react';
import logo from '../../assets/Mahindra_Logo.png';
import { APP_METADATA } from '../../utils/constants';

/**
 * Header Component
 * Main application header with logo, title, and dark mode toggle
 */
const Header = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-mahindra-gray-darker">
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt={APP_METADATA.title}
              className="object-contain w-auto h-8 sm:h-10 md:h-12"
            />
            <div className="hidden pl-4 border-l border-mahindra-red sm:block">
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                {APP_METADATA.title}
              </h1>
              <p className="text-xs text-gray-600 md:text-sm dark:text-gray-400">
                {APP_METADATA.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onToggleDarkMode}
            className="p-3 transition-all duration-200 bg-gray-100 rounded-lg dark:bg-mahindra-gray-dark hover:bg-mahindra-red/10 dark:hover:bg-mahindra-red/20 hover:scale-105 active:scale-95"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun size={22} className="text-mahindra-red" />
            ) : (
              <Moon size={22} className="text-mahindra-red" />
            )}
          </button>
        </div>
      </div>
      {/* Mahindra Red Accent Line */}
      <div className="flex justify-center w-full">
        <div className="w-[35%] h-[0.5px] bg-mahindra-red"></div>
      </div>
    </header>
  );
};

export default Header;
