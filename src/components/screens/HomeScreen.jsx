import { Car, MapPin, FileDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SCREENS } from '../../utils/constants';

/**
 * HomeScreen Component
 * Main landing page with navigation cards
 */
const HomeScreen = () => {
  const { navigateTo } = useApp();

  const cards = [
    {
      id: 'park',
      title: 'Park Vehicle',
      description: 'Register vehicle location in the plant',
      Icon: Car,
      screen: SCREENS.PARK,
    },
    {
      id: 'track',
      title: 'Track Vehicle',
      description: 'Find vehicle location in real-time',
      Icon: MapPin,
      screen: SCREENS.TRACK,
    },
    {
      id: 'report',
      title: 'Download Report',
      description: 'Export vehicle tracking data',
      Icon: FileDown,
      screen: SCREENS.REPORT,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          Vehicle Geo Detection
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base">
          Track and manage vehicle locations in real-time
        </p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map(({ id, title, description, Icon, screen }) => (
          <button
            key={id}
            onClick={() => navigateTo(screen)}
            className="p-8 transition-all duration-300 bg-white border-2 border-transparent shadow-md group dark:bg-mahindra-gray-darker rounded-xl hover:shadow-xl hover:border-mahindra-red dark:hover:border-mahindra-red hover:-translate-y-1"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-5 transition-colors rounded-full bg-mahindra-red/10 dark:bg-mahindra-red/20 group-hover:bg-mahindra-red/20 dark:group-hover:bg-mahindra-red/30">
                <Icon size={48} className="text-mahindra-red" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
