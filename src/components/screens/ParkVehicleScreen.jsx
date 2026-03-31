import { Car, QrCode, CheckCircle2, Camera, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useParkVehicle } from '../../hooks/useParkVehicle';
import BackButton from '../common/BackButton';
import CameraCapture from '../common/CameraCapture';
import ErrorMessage from '../common/ErrorMessage';
import ImageSourceModal from '../common/ImageSourceModal';
import LoadingSpinner from '../common/LoadingSpinner';
import LocationDisplay from '../common/LocationDisplay';
import StepIndicator from '../common/StepIndicator';
import VinInput from '../common/VinInput';
import QRScanner from '../QRScanner';

/**
 * ParkVehicleScreen Component
 * New Flow: VIN -> Location (Step 1) -> Image (Step 2) -> Submit (Step 3)
 * Screen for parking vehicles with VIN, GPS location, and image capture
 */
const ParkVehicleScreen = () => {
  const { navigateHome } = useApp();
  const {
    vinNumber,
    setVinNumber,
    location,
    capturedImage,
    isScanning,
    setIsScanning,
    isImageModalOpen,
    setIsImageModalOpen,
    isCameraOpen,
    setIsCameraOpen,
    isLoading,
    error,
    setError,
    galleryInputRef,
    handleFetchLocationOnly,
    handleShowImageModal,
    handleSelectCamera,
    handleSelectGallery,
    handleCameraCapture,
    handleGalleryUpload,
    handleFinalSubmit,
    handleScanSuccess,
    resetParkVehicle,
  } = useParkVehicle();

  const handleBack = () => {
    navigateHome();
    resetParkVehicle();
  };

  if (isScanning) {
    return (
      <div className="flex flex-col items-center justify-start min-h-[calc(100vh-180px)] px-4 py-8">
        <div className="w-full max-w-3xl">
          <BackButton onClick={handleBack} />
          <div className="p-8 bg-white shadow-lg dark:bg-mahindra-gray-darker rounded-xl border-2 border-gray-100 dark:border-mahindra-red/20">
            <QRScanner
              onScanSuccess={handleScanSuccess}
              onClose={() => setIsScanning(false)}
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

          <div className="space-y-6">
            {/* VIN Input */}
            <VinInput
              value={vinNumber}
              onChange={setVinNumber}
              error={error}
              setError={setError}
            />

            {/* Error Message */}
            <ErrorMessage message={error} />

            {/* QR Scan Button */}
            <button
              onClick={() => setIsScanning(true)}
              className="flex items-center justify-center w-full py-4 space-x-3 font-semibold text-gray-900 transition-all bg-gray-100 border-2 border-gray-300 rounded-lg dark:bg-mahindra-gray-dark dark:text-white hover:bg-gray-200 dark:hover:bg-mahindra-red/20 dark:border-mahindra-red/30"
            >
              <QrCode size={24} />
              <span>Scan QR Code</span>
            </button>

            {/* Step 1: Fetch Location Button */}
            {vinNumber.trim() && !location && (
              <div className="space-y-3">
                <StepIndicator
                  step={1}
                  title="Step 1: Fetch GPS location"
                  variant="info"
                />
                <button
                  onClick={handleFetchLocationOnly}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white py-4 rounded-lg disabled:cursor-not-allowed transition-all font-bold text-lg shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center"
                >
                  {isLoading ? (
                    <LoadingSpinner text="Getting Location..." />
                  ) : (
                    <>
                      <MapPin size={20} className="mr-2" />
                      Fetch GPS Location
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Location Display */}
            {location && (
              <LocationDisplay
                location={location}
                vinNumber={vinNumber}
                title="Step 1 Complete: GPS Location Captured"
              />
            )}

            {/* Step 2: Capture Image Button */}
            {location && !capturedImage && (
              <div className="space-y-3">
                <StepIndicator
                  step={2}
                  title="Step 2: Capture vehicle image"
                  variant="success"
                />
                {/* Hidden file input for gallery only */}
                <input
                  type="file"
                  ref={galleryInputRef}
                  onChange={handleGalleryUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={handleShowImageModal}
                  className="flex items-center justify-center w-full py-4 space-x-3 font-semibold text-white transition-all bg-green-600 hover:bg-green-700 rounded-lg shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  <Camera size={24} />
                  <span>Capture Vehicle Image</span>
                </button>
              </div>
            )}

            {/* Image Preview */}
            {capturedImage && (
              <div className="p-4 border-2 border-green-300 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                <div className="flex items-center mb-3">
                  <CheckCircle2 size={20} className="mr-2 text-green-600 dark:text-green-400" />
                  <p className="font-semibold text-green-700 dark:text-green-300">
                    Step 2 Complete: Image Captured
                  </p>
                </div>
                <img
                  src={capturedImage}
                  alt="Captured vehicle"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Step 3: Final Submit Button */}
            {location && capturedImage && (
              <div className="space-y-3">
                <StepIndicator
                  step={3}
                  title="Step 3: Submit vehicle data to database"
                  variant="primary"
                />
                <button
                  onClick={handleFinalSubmit}
                  className="w-full bg-mahindra-red hover:bg-mahindra-red-dark text-white py-4 rounded-lg transition-all font-bold text-lg shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center"
                >
                  <CheckCircle2 size={20} className="mr-2" />
                  Submit Vehicle Data
                </button>
              </div>
            )}

            {/* Image Source Modal */}
            <ImageSourceModal
              isOpen={isImageModalOpen}
              onClose={() => setIsImageModalOpen(false)}
              onSelectCamera={handleSelectCamera}
              onSelectGallery={handleSelectGallery}
            />

            {/* Camera Capture Component */}
            <CameraCapture
              isOpen={isCameraOpen}
              onClose={() => setIsCameraOpen(false)}
              onCapture={handleCameraCapture}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkVehicleScreen;
