import { CheckCircle2, MapPin } from 'lucide-react';

/**
 * LocationDisplay Component
 * Displays location data in a formatted card
 */
const LocationDisplay = ({
  location,
  vinNumber,
  title = 'GPS Location Captured',
  showImage = false,
  showMapLink = false
}) => {
  if (!location) return null;

  return (
    <div className="p-6 mt-6 border-2 border-blue-300 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
      <div className="flex items-center mb-4">
        <CheckCircle2 size={24} className="mr-2 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">
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
          {vinNumber && (
            <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">VIN Number</p>
              <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                {vinNumber}
              </p>
            </div>
          )}
          <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              ±{location.accuracy.toFixed(2)} meters
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Latitude</p>
            <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
              {location.latitude.toFixed(6)}
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Longitude</p>
            <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
              {location.longitude.toFixed(6)}
            </p>
          </div>
          {location.parkedBy && (
            <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Parked By</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {location.parkedBy}
              </p>
            </div>
          )}
          {location.parkedAt && (
            <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Parked At</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {new Date(location.parkedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
        <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            {location.parkedAt ? 'Last Updated' : 'Timestamp'}
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {new Date(location.timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Google Maps Link */}
      {showMapLink && (
        <div className="pt-4 mt-4 border-t border-mahindra-red/20 dark:border-mahindra-red/30">
          <a
            href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full py-3 font-semibold text-white transition-all bg-mahindra-red rounded-lg hover:bg-mahindra-red-dark"
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
