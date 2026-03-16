import { useState, useEffect } from "react";
import { Moon, Sun, Car, MapPin, FileDown, QrCode, CheckCircle2, AlertCircle } from "lucide-react";
import QRScanner from "./components/QRScanner";
import logo from "./assets/Mahindra_Logo.png";

// Home Screen Component
const HomeScreen = ({ setCurrentScreen }) => (
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
      {/* Park Vehicle Card */}
      <button
        onClick={() => setCurrentScreen("park")}
        className="p-8 transition-all duration-300 bg-white border-2 border-transparent shadow-md group dark:bg-mahindra-gray-darker rounded-xl hover:shadow-xl hover:border-mahindra-red dark:hover:border-mahindra-red hover:-translate-y-1"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-5 transition-colors rounded-full bg-mahindra-red/10 dark:bg-mahindra-red/20 group-hover:bg-mahindra-red/20 dark:group-hover:bg-mahindra-red/30">
            <Car size={48} className="text-mahindra-red" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Park Vehicle
          </h3>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Register vehicle location in the plant
          </p>
        </div>
      </button>

      {/* Track Vehicle Card */}
      <button
        onClick={() => setCurrentScreen("track")}
        className="p-8 transition-all duration-300 bg-white border-2 border-transparent shadow-md group dark:bg-mahindra-gray-darker rounded-xl hover:shadow-xl hover:border-mahindra-red dark:hover:border-mahindra-red hover:-translate-y-1"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-5 transition-colors rounded-full bg-mahindra-red/10 dark:bg-mahindra-red/20 group-hover:bg-mahindra-red/20 dark:group-hover:bg-mahindra-red/30">
            <MapPin size={48} className="text-mahindra-red" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Track Vehicle
          </h3>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Find vehicle location in real-time
          </p>
        </div>
      </button>

      {/* Download Report Card */}
      <button
        onClick={() => setCurrentScreen("report")}
        className="p-8 transition-all duration-300 bg-white border-2 border-transparent shadow-md group dark:bg-mahindra-gray-darker rounded-xl hover:shadow-xl hover:border-mahindra-red dark:hover:border-mahindra-red hover:-translate-y-1"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-5 transition-colors rounded-full bg-mahindra-red/10 dark:bg-mahindra-red/20 group-hover:bg-mahindra-red/20 dark:group-hover:bg-mahindra-red/30">
            <FileDown size={48} className="text-mahindra-red" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Download Report
          </h3>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Export vehicle tracking data
          </p>
        </div>
      </button>
    </div>
  </div>
);

// Park Vehicle Screen Component
const ParkVehicleScreen = ({
  vinNumber,
  setVinNumber,
  location,
  isScanning,
  setIsScanning,
  isLoading,
  error,
  setError,
  handleConfirmPark,
  handleScanSuccess,
  resetParkVehicle,
  setCurrentScreen,
}) => (
  <div className="flex flex-col items-center justify-start min-h-[calc(100vh-180px)] px-4 py-8">
    <div className="w-full max-w-3xl">
      {/* Back Button */}
      <button
        onClick={() => {
          setCurrentScreen("home");
          resetParkVehicle();
        }}
        className="flex items-center mb-6 text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

      <div className="p-8 bg-white shadow-lg dark:bg-mahindra-gray-darker rounded-xl border-2 border-gray-100 dark:border-mahindra-red/20">
        <div className="flex items-center mb-8">
          <div className="p-3 mr-4 rounded-lg bg-mahindra-red/10 dark:bg-mahindra-red/20">
            <Car size={32} className="text-mahindra-red" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Park Vehicle
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter VIN or scan QR code to register vehicle
            </p>
          </div>
        </div>

        {!isScanning ? (
          <div className="space-y-6">
            {/* VIN Input */}
            <div>
              <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Vehicle Identification Number (VIN) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={vinNumber}
                onChange={(e) => {
                  const newValue = e.target.value.toUpperCase();
                  setVinNumber(newValue);
                  setError("");
                }}
                placeholder="Enter VIN"
                autoComplete="off"
                className="w-full px-4 py-3 text-lg placeholder-gray-400 transition-all border-2 border-gray-300 rounded-lg dark:border-mahindra-red/30 focus:ring-2 focus:ring-mahindra-red focus:border-mahindra-red dark:bg-mahindra-gray-dark dark:text-white dark:placeholder-gray-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start p-4 space-x-2 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* QR Scan Button */}
            <button
              onClick={() => setIsScanning(true)}
              className="flex items-center justify-center w-full py-4 space-x-3 font-semibold text-gray-900 transition-all bg-gray-100 border-2 border-gray-300 rounded-lg dark:bg-mahindra-gray-dark dark:text-white hover:bg-gray-200 dark:hover:bg-mahindra-red/20 dark:border-mahindra-red/30"
            >
              <QrCode size={24} />
              <span>Scan QR Code</span>
            </button>

            {/* Confirm Park Button */}
            <button
              onClick={handleConfirmPark}
              disabled={isLoading || !vinNumber.trim()}
              className="w-full bg-mahindra-red hover:bg-mahindra-red-dark disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white py-4 rounded-lg disabled:cursor-not-allowed transition-all font-bold text-lg shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-3 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Getting Location...
                </span>
              ) : (
                <>
                  <MapPin size={20} className="mr-2" />
                  Confirm Park
                </>
              )}
            </button>

            {/* Location Success Display */}
            {location && (
              <div className="p-6 mt-6 border-2 border-mahindra-red/30 rounded-lg bg-mahindra-red/5 dark:bg-mahindra-red/10 dark:border-mahindra-red/40">
                <div className="flex items-center mb-4">
                  <CheckCircle2 size={24} className="mr-2 text-mahindra-red" />
                  <h3 className="text-lg font-bold text-mahindra-red-dark dark:text-mahindra-red-light">
                    Location Captured Successfully
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
                      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">VIN Number</p>
                      <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">{vinNumber}</p>
                    </div>
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
                  </div>
                  <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Timestamp</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {new Date(location.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-mahindra-red/20 dark:border-mahindra-red/30">
                  <p className="flex items-center text-xs italic text-mahindra-red-dark dark:text-mahindra-red-light">
                    <CheckCircle2 size={14} className="mr-1" />
                    Data ready to be saved to database
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <QRScanner
            onScanSuccess={handleScanSuccess}
            onClose={() => setIsScanning(false)}
          />
        )}
      </div>
    </div>
  </div>
);

// Track Vehicle Screen Component
const TrackVehicleScreen = ({
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
  setCurrentScreen,
}) => (
  <div className="flex flex-col items-center justify-start min-h-[calc(100vh-180px)] px-4 py-8">
    <div className="w-full max-w-3xl">
      {/* Back Button */}
      <button
        onClick={() => {
          setCurrentScreen("home");
          resetTrackVehicle();
        }}
        className="flex items-center mb-6 text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

      <div className="p-8 bg-white shadow-lg dark:bg-mahindra-gray-darker rounded-xl border-2 border-gray-100 dark:border-mahindra-red/20">
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

        {!isTrackScanning ? (
          <div className="space-y-6">
            {/* VIN Input */}
            <div>
              <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Vehicle Identification Number (VIN) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={trackVinNumber}
                onChange={(e) => {
                  const newValue = e.target.value.toUpperCase();
                  setTrackVinNumber(newValue);
                  setTrackError("");
                }}
                placeholder="Enter VIN"
                autoComplete="off"
                className="w-full px-4 py-3 text-lg placeholder-gray-400 transition-all border-2 border-gray-300 rounded-lg dark:border-mahindra-red/30 focus:ring-2 focus:ring-mahindra-red focus:border-mahindra-red dark:bg-mahindra-gray-dark dark:text-white dark:placeholder-gray-500"
              />
            </div>

            {/* Error Message */}
            {trackError && (
              <div className="flex items-start p-4 space-x-2 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">{trackError}</p>
              </div>
            )}

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
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-3 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Fetching Location...
                </span>
              ) : (
                <>
                  <MapPin size={20} className="mr-2" />
                  Fetch Location
                </>
              )}
            </button>

            {/* Location Display */}
            {trackLocation && (
              <div className="p-6 mt-6 border-2 border-mahindra-red/30 rounded-lg bg-mahindra-red/5 dark:bg-mahindra-red/10 dark:border-mahindra-red/40">
                <div className="flex items-center mb-4">
                  <CheckCircle2 size={24} className="mr-2 text-mahindra-red" />
                  <h3 className="text-lg font-bold text-mahindra-red-dark dark:text-mahindra-red-light">
                    Vehicle Location Found
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
                      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">VIN Number</p>
                      <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">{trackVinNumber}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
                      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        ±{trackLocation.accuracy.toFixed(2)} meters
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
                      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Latitude</p>
                      <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                        {trackLocation.latitude.toFixed(6)}
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
                      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Longitude</p>
                      <p className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                        {trackLocation.longitude.toFixed(6)}
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
                      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Parked By</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {trackLocation.parkedBy}
                      </p>
                    </div>
                    <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
                      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Parked At</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {new Date(trackLocation.parkedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-lg dark:bg-mahindra-gray-dark">
                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Last Updated</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {new Date(trackLocation.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-mahindra-red/20 dark:border-mahindra-red/30">
                  <a
                    href={`https://www.google.com/maps?q=${trackLocation.latitude},${trackLocation.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full py-3 font-semibold text-white transition-all bg-mahindra-red rounded-lg hover:bg-mahindra-red-dark"
                  >
                    <MapPin size={20} className="mr-2" />
                    View on Google Maps
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          <QRScanner
            onScanSuccess={handleTrackScanSuccess}
            onClose={() => setIsTrackScanning(false)}
          />
        )}
      </div>
    </div>
  </div>
);

// Download Report Screen Component
const DownloadReportScreen = ({ setCurrentScreen }) => (
  <div className="flex flex-col items-center justify-start min-h-[calc(100vh-180px)] px-4 py-8">
    <div className="w-full max-w-3xl">
      <button
        onClick={() => setCurrentScreen("home")}
        className="flex items-center mb-6 text-gray-600 transition-colors dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

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
          <p className="text-sm text-gray-500 dark:text-gray-500">This feature is under development</p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [vinNumber, setVinNumber] = useState("");
  const [location, setLocation] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Track Vehicle specific states
  const [trackVinNumber, setTrackVinNumber] = useState("");
  const [trackLocation, setTrackLocation] = useState(null);
  const [isTrackScanning, setIsTrackScanning] = useState(false);
  const [isTrackLoading, setIsTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState("");

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    const isDark = storedDarkMode === null ? true : storedDarkMode === "true";
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleConfirmPark = async () => {
    setError("");

    if (!vinNumber.trim()) {
      setError("Please enter a VIN number");
      return;
    }

    setIsLoading(true);

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString(),
          };
          setLocation(locationData);
          setIsLoading(false);

          // Here you would normally hit your database
          console.log("Data to be saved:", {
            vin: vinNumber,
            location: locationData,
          });

          // TODO: Add your database API call here
          // Example:
          // fetch('/api/park-vehicle', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ vin: vinNumber, location: locationData })
          // });
        },
        (error) => {
          setIsLoading(false);
          setError(
            "Error getting location: " +
              error.message +
              ". Please enable location services."
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setIsLoading(false);
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleScanSuccess = (decodedText) => {
    setVinNumber(decodedText);
    setIsScanning(false);
    setError("");
  };

  const resetParkVehicle = () => {
    setVinNumber("");
    setLocation(null);
    setIsScanning(false);
    setError("");
  };

  const handleTrackScanSuccess = (decodedText) => {
    setTrackVinNumber(decodedText);
    setIsTrackScanning(false);
    setTrackError("");
  };

  const handleFetchLocation = async () => {
    setTrackError("");

    if (!trackVinNumber.trim()) {
      setTrackError("Please enter a VIN number");
      return;
    }

    setIsTrackLoading(true);

    // Simulate fetching location from database
    // In a real application, this would be an API call to your backend
    setTimeout(() => {
      // Mock location data - replace with actual API call
      const mockLocation = {
        latitude: 28.6139 + (Math.random() - 0.5) * 0.01,
        longitude: 77.2090 + (Math.random() - 0.5) * 0.01,
        accuracy: Math.random() * 10 + 5,
        timestamp: new Date().toISOString(),
        parkedBy: "User123",
        parkedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      };

      setTrackLocation(mockLocation);
      setIsTrackLoading(false);

      // TODO: Replace with actual API call
      // Example:
      // fetch('/api/track-vehicle', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ vin: trackVinNumber })
      // })
      // .then(res => res.json())
      // .then(data => {
      //   setTrackLocation(data.location);
      //   setIsTrackLoading(false);
      // })
      // .catch(err => {
      //   setTrackError("Vehicle not found in database");
      //   setIsTrackLoading(false);
      // });
    }, 1500);
  };

  const resetTrackVehicle = () => {
    setTrackVinNumber("");
    setTrackLocation(null);
    setIsTrackScanning(false);
    setTrackError("");
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-mahindra-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-mahindra-gray-darker">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={logo}
                alt="Vehicle Geo Detection"
                className="object-contain w-auto h-8 sm:h-10 md:h-12"
              />
              <div className="hidden pl-4 border-l border-mahindra-red sm:block">
                <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                  Vehicle Geo Detection
                </h1>
                <p className="text-xs text-gray-600 md:text-sm dark:text-gray-400">
                  Real-time Location Tracking
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
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
        {/* Mahindra Red Accent Line - 35% width, thinnest possible */}
        <div className="flex justify-center w-full">
          <div className="w-[35%] h-[0.5px] bg-mahindra-red"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl">
        {currentScreen === "home" && <HomeScreen setCurrentScreen={setCurrentScreen} />}
        {currentScreen === "park" && (
          <ParkVehicleScreen
            vinNumber={vinNumber}
            setVinNumber={setVinNumber}
            location={location}
            isScanning={isScanning}
            setIsScanning={setIsScanning}
            isLoading={isLoading}
            error={error}
            setError={setError}
            handleConfirmPark={handleConfirmPark}
            handleScanSuccess={handleScanSuccess}
            resetParkVehicle={resetParkVehicle}
            setCurrentScreen={setCurrentScreen}
          />
        )}
        {currentScreen === "track" && (
          <TrackVehicleScreen
            trackVinNumber={trackVinNumber}
            setTrackVinNumber={setTrackVinNumber}
            trackLocation={trackLocation}
            isTrackScanning={isTrackScanning}
            setIsTrackScanning={setIsTrackScanning}
            isTrackLoading={isTrackLoading}
            trackError={trackError}
            setTrackError={setTrackError}
            handleFetchLocation={handleFetchLocation}
            handleTrackScanSuccess={handleTrackScanSuccess}
            resetTrackVehicle={resetTrackVehicle}
            setCurrentScreen={setCurrentScreen}
          />
        )}
        {currentScreen === "report" && <DownloadReportScreen setCurrentScreen={setCurrentScreen} />}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white dark:bg-mahindra-gray-darker">
        <div className="flex justify-center w-full">
          <div className="w-[35%] h-[0.5px] bg-mahindra-red"></div>
        </div>
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Mahindra AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
 