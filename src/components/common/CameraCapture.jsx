import { useEffect, useRef, useState } from 'react';
import { Camera, X, RotateCcw, CheckCircle } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * CameraCapture Component
 * Real-time camera access using MediaDevices API
 * Allows users to capture photos directly from their device camera
 */
const CameraCapture = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' for front, 'environment' for back

  // Start camera when component opens
  useEffect(() => {
    if (isOpen) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    try {
      setError('');
      setIsCameraReady(false);

      // Stop any existing stream
      stopCamera();

      // Request camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError(
        'Unable to access camera. Please ensure camera permissions are granted and try again.'
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraReady(false);
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64 image
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(imageData);
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleUsePhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      handleClose();
    }
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage(null);
    setError('');
    onClose();
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
    setCapturedImage(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl dark:bg-mahindra-gray-darker border-2 border-gray-200 dark:border-mahindra-red/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-mahindra-gray-dark border-b-2 border-gray-200 dark:border-mahindra-red/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Camera size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {capturedImage ? 'Photo Preview' : 'Camera'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-mahindra-gray dark:text-gray-400"
            aria-label="Close camera"
          >
            <X size={24} />
          </button>
        </div>

        {/* Camera/Preview Area */}
        <div className="relative bg-black aspect-video">
          {error && (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="max-w-md p-6 text-center bg-red-100 border-2 border-red-300 rounded-lg dark:bg-red-900/20 dark:border-red-800">
                <p className="text-lg font-semibold text-red-800 dark:text-red-300">
                  {error}
                </p>
              </div>
            </div>
          )}

          {!error && !capturedImage && (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {!isCameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
                    <p className="text-lg font-semibold text-white">
                      Starting camera...
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-contain"
            />
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controls */}
        <div className="p-6 bg-gray-50 dark:bg-mahindra-gray-dark">
          {!capturedImage ? (
            <div className="flex items-center justify-center space-x-4">
              {/* Flip Camera Button */}
              <button
                onClick={toggleCamera}
                disabled={!isCameraReady}
                className="p-4 text-white transition-all bg-gray-600 rounded-full hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label="Switch camera"
              >
                <RotateCcw size={24} />
              </button>

              {/* Capture Button */}
              <button
                onClick={handleCapture}
                disabled={!isCameraReady}
                className="flex items-center justify-center px-8 py-4 space-x-3 text-lg font-bold text-white transition-all bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed hover:shadow-xl active:scale-95"
              >
                <Camera size={28} />
                <span>Capture Photo</span>
              </button>

              {/* Cancel Button */}
              <button
                onClick={handleClose}
                className="px-6 py-3 font-semibold text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-mahindra-gray dark:text-gray-300 dark:hover:bg-mahindra-gray-darker"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-4">
              {/* Retake Button */}
              <button
                onClick={handleRetake}
                className="flex items-center justify-center px-6 py-3 space-x-2 font-semibold text-gray-700 transition-all bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-mahindra-gray dark:text-gray-300 dark:hover:bg-mahindra-gray-darker"
              >
                <RotateCcw size={20} />
                <span>Retake</span>
              </button>

              {/* Use Photo Button */}
              <button
                onClick={handleUsePhoto}
                className="flex items-center justify-center px-8 py-4 space-x-3 text-lg font-bold text-white transition-all bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl active:scale-95"
              >
                <CheckCircle size={24} />
                <span>Use This Photo</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CameraCapture.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCapture: PropTypes.func.isRequired,
};

export default CameraCapture;
