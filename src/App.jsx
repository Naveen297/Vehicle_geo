import { useDarkMode } from './hooks/useDarkMode';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeScreen from './components/screens/HomeScreen';
import ParkVehicleScreen from './components/screens/ParkVehicleScreen';
import TrackVehicleScreen from './components/screens/TrackVehicleScreen';
import DownloadReportScreen from './components/screens/DownloadReportScreen';
import { SCREENS } from './utils/constants';

/**
 * AppContent Component
 * Main content renderer based on current screen
 */
const AppContent = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.PARK:
        return <ParkVehicleScreen />;
      case SCREENS.TRACK:
        return <TrackVehicleScreen />;
      case SCREENS.REPORT:
        return <DownloadReportScreen />;
      case SCREENS.HOME:
      default:
        return <HomeScreen />;
    }
  };

  return <main className="mx-auto max-w-7xl">{renderScreen()}</main>;
};

/**
 * App Component
 * Root application component
 */
function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <AppProvider>
      <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-mahindra-black">
        <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        <AppContent />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
