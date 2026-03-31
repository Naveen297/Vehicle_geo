import { FileDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import BackButton from '../common/BackButton';
import { MESSAGES } from '../../utils/constants';

/**
 * DownloadReportScreen Component
 * Screen for downloading vehicle tracking reports (Coming Soon)
 */
const DownloadReportScreen = () => {
  const { navigateHome } = useApp();

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-180px)] px-4 py-8">
      <div className="w-full max-w-3xl">
        <BackButton onClick={navigateHome} />

        <div className="p-8 bg-white shadow-lg dark:bg-mahindra-gray-darker rounded-xl border-2 border-gray-100 dark:border-mahindra-red/20">
          <div className="flex items-center mb-8">
            <div className="p-3 mr-4 rounded-lg bg-mahindra-red/10 dark:bg-mahindra-red/20">
              <FileDown size={32} className="text-mahindra-red" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Download Report
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Export vehicle tracking and analytics data
              </p>
            </div>
          </div>

          <div className="py-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-mahindra-red/10 rounded-full dark:bg-mahindra-red/20">
              <FileDown size={48} className="text-mahindra-red" />
            </div>
            <p className="mb-2 text-xl text-gray-600 dark:text-gray-400">Coming Soon</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {MESSAGES.COMING_SOON}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadReportScreen;
