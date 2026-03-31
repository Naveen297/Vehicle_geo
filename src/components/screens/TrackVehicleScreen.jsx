import { MapPin, QrCode } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTrackVehicle } from '../../hooks/useTrackVehicle';
import BackButton from '../common/BackButton';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';
import LocationDisplay from '../common/LocationDisplay';
import VinInput from '../common/VinInput';
import QRScanner from '../QRScanner';

/**
 * TrackVehicleScreen Component
 * Screen for tracking vehicle location by VIN number
 */
const TrackVehicleScreen = () => {
  const { navigateHome } = useApp();
  const {
    trackVinNumber,
    setTrackVinNumber,
    trackLocation,
    isTrackScanning,
    setIsTrackScanning,
    isTrackLoading,
    trackError,
    setTrackError,
    handleFetchLocation,
    handleTrackScanSuccess,
    resetTrackVehicle,
  } = useTrackVehicle();

  const handleBack = () => {
    navigateHome();
    resetTrackVehicle();
  };

  if (isTrackScanning) {
    return (
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-180px)] px-4 py-8">
        <div className="w-full max-w-3xl">
          <BackButton onClick={handleBack} />
          <div className="p-8 bg-white shadow-lg dark:bg-mahindra-gray-darker rounded-xl border-2 border-gray-100 dark:border-mahindra-red/20">
            <QRScanner
              onScanSuccess={handleTrackScanSuccess}
              onClose={() => setIsTrackScanning(false)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-180px)] px-4 py-8">
      <div className="w-full max-w-3xl">
        <BackButton onClick={handleBack} />

        <div className="p-8 bg-white shadow-lg dark:bg-mahindra-gray-darker rounded-xl border-2 border-gray-100 dark:border-mahindra-red/20">
          {/* Header */}
          <div className="flex items-center mb-8">
            <div className="p-3 mr-4 rounded-lg bg-mahindra-red/10 dark:bg-mahindra-red/20">
              <MapPin size={32} className="text-mahindra-red" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Track Vehicle
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter VIN or scan QR code to locate vehicle
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* VIN Input */}
            <VinInput
              value={trackVinNumber}
              onChange={setTrackVinNumber}
              error={trackError}
              setError={setTrackError}
            />

            {/* Error Message */}
            <ErrorMessage message={trackError} />

            {/* QR Scan Button */}
            <button
              onClick={() => setIsTrackScanning(true)}
              className="flex items-center justify-center w-full py-4 space-x-3 font-semibold text-gray-900 transition-all bg-gray-100 border-2 border-gray-300 rounded-lg dark:bg-mahindra-gray-dark dark:text-white hover:bg-gray-200 dark:hover:bg-mahindra-red/20 dark:border-mahindra-red/30"
            >
              <QrCode size={24} />
              <span>Scan QR Code</span>
            </button>

            {/* Fetch Location Button */}
            <button
              onClick={handleFetchLocation}
              disabled={isTrackLoading || !trackVinNumber.trim()}
              className="w-full bg-mahindra-red hover:bg-mahindra-red-dark disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white py-4 rounded-lg disabled:cursor-not-allowed transition-all font-bold text-lg shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center"
            >
              {isTrackLoading ? (
                <LoadingSpinner text="Fetching Location..." />
              ) : (
                <>
                  <MapPin size={20} className="mr-2" />
                  Fetch Location
                </>
              )}
            </button>

            {/* Location Display */}
            {trackLocation && (
              <LocationDisplay
                location={trackLocation}
                vinNumber={trackVinNumber}
                title="Vehicle Location Found"
                showImage={true}
                showMapLink={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackVehicleScreen;
