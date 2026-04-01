import { CheckCircle2, MapPin } from 'lucide-react';

/**
 * LocationDisplay Component
 * Displays location data in a formatted card
 *
 * Supports two data formats:
 * 1. Direct location object: { latitude, longitude, accuracy, timestamp, ... }
 * 2. Backend API format: { vin, location: { latitude, longitude, accuracy, timestamp } }
 */
const LocationDisplay = ({
  location,
  vinNumber,
  title = 'GPS Location Captured',
  showImage = false,
  showMapLink = false
}) => {
  if (!location) return null;

  // Handle both direct location object and API response format
  // API format: { vin, location: { latitude, longitude, accuracy, timestamp } }
  // Direct format: { latitude, longitude, accuracy, timestamp }
  const locationData = location.location || location;
  const displayVin = location.vin || vinNumber;

  return (
    <div className="p-6 mt-6 border-2 border-green-300 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800">
      <div className="flex items-center mb-4">
        <CheckCircle2 size={24} className="mr-2 text-green-600 dark:text-green-400" />
        <h3 className="text-lg font-bold text-green-700 dark:text-green-300">
          {title}
        </h3>
      </div>

      {/* Vehicle Image */}
      {showImage && location.image && (
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Vehicle Image
          </p>
          <img src={location.image} alt="Vehicle" className="w-full rounded-lg shadow-md" />
        </div>
      )}

      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {displayVin && (
            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-mahindra-gray-dark">
              <p className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">VIN Number</p>
              <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                {displayVin}
              </p>
            </div>
          )}
          <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-mahindra-gray-dark">
            <p className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">Accuracy</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              ±{locationData.accuracy.toFixed(2)} meters
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-mahindra-gray-dark">
            <p className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">Latitude</p>
            <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">
              {locationData.latitude.toFixed(6)}
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-mahindra-gray-dark">
            <p className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">Longitude</p>
            <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">
              {locationData.longitude.toFixed(6)}
            </p>
          </div>
          {location.parkedBy && (
            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-mahindra-gray-dark">
              <p className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">Parked By</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {location.parkedBy}
              </p>
            </div>
          )}
          {location.parkedAt && (
            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-mahindra-gray-dark">
              <p className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">Parked At</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {new Date(location.parkedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
        <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-mahindra-gray-dark">
          <p className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
            {location.parkedAt ? 'Last Updated' : 'Capture Timestamp'}
          </p>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {new Date(locationData.timestamp).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'medium',
              timeZone: 'UTC'
            })}
          </p>
        </div>
      </div>

      {/* Google Maps Link */}
      {showMapLink && (
        <div className="pt-4 mt-4 border-t-2 border-green-200 dark:border-green-800">
          <a
            href={`https://www.google.com/maps?q=${locationData.latitude},${locationData.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full py-3 font-semibold text-white transition-all bg-mahindra-red rounded-lg shadow-md hover:bg-mahindra-red-dark hover:shadow-lg active:scale-[0.98]"
          >
            <MapPin size={20} className="mr-2" />
            View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default LocationDisplay;
