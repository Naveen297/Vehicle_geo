import { Camera, Image, X } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * ImageSourceModal Component
 * Modal to choose between camera or gallery for image capture
 */
const ImageSourceModal = ({ isOpen, onClose, onSelectCamera, onSelectGallery }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl dark:bg-mahindra-gray-darker border-2 border-gray-200 dark:border-mahindra-red/30 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Choose Image Source
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-mahindra-gray-dark dark:text-gray-400"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Description */}
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Select how you want to capture the vehicle image
        </p>

        {/* Options */}
        <div className="space-y-4">
          {/* Camera Option */}
          <button
            onClick={() => {
              onSelectCamera();
              onClose();
            }}
            className="w-full flex items-center p-5 space-x-4 text-left transition-all bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-800 dark:hover:bg-blue-900/30 group"
          >
            <div className="p-3 bg-blue-600 rounded-lg dark:bg-blue-700 group-hover:scale-110 transition-transform">
              <Camera size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Open Camera
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Take a new photo with your camera
              </p>
            </div>
          </button>

          {/* Gallery Option */}
          <button
            onClick={() => {
              onSelectGallery();
              onClose();
            }}
            className="w-full flex items-center p-5 space-x-4 text-left transition-all bg-green-50 border-2 border-green-200 rounded-xl hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800 dark:hover:bg-green-900/30 group"
          >
            <div className="p-3 bg-green-600 rounded-lg dark:bg-green-700 group-hover:scale-110 transition-transform">
              <Image size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Open Gallery
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose an existing image from gallery
              </p>
            </div>
          </button>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full py-3 mt-6 font-semibold text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-mahindra-gray-dark dark:text-gray-300 dark:hover:bg-mahindra-gray"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

ImageSourceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectCamera: PropTypes.func.isRequired,
  onSelectGallery: PropTypes.func.isRequired,
};

export default ImageSourceModal;
