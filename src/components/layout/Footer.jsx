import { APP_METADATA } from '../../utils/constants';

/**
 * Footer Component
 * Application footer with copyright information
 */
const Footer = () => {
  return (
    <footer className="mt-auto bg-white dark:bg-mahindra-gray-darker">
      <div className="flex justify-center w-full">
        <div className="w-[35%] h-[0.5px] bg-mahindra-red"></div>
      </div>
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} {APP_METADATA.copyright}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
