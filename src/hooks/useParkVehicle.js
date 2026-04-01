import { useState, useRef } from 'react';
import { useGeolocation } from './useGeolocation';
import { parkVehicle } from '../services/vehicleService';

/**
 * Custom hook for managing Park Vehicle functionality
 * New Flow: VIN -> Location -> Image -> Submit
 * Handles VIN input, location fetching, image capture (camera/gallery), and submission
 */
export const useParkVehicle = () => {
  const [vinNumber, setVinNumber] = useState('');
  const [location, setLocation] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState('');
  const galleryInputRef = useRef(null);

  const { getCurrentLocation, isLoading } = useGeolocation();

  // Fetch GPS location only
  const handleFetchLocationOnly = async () => {
    setError('');

    if (!vinNumber.trim()) {
      setError('Please enter a VIN number');
      return;
    }

    try {
      const locationData = await getCurrentLocation();
      setLocation(locationData);
    } catch (err) {
      setError(err.message);
    }
  };

  // Show image source modal
  const handleShowImageModal = () => {
    setError('');

    if (!vinNumber.trim()) {
      setError('Please enter a VIN number');
      return;
    }

    if (!location) {
      setError('Please fetch GPS location first');
      return;
    }

    setIsImageModalOpen(true);
  };

  // Handle camera selection - opens real camera component
  const handleSelectCamera = () => {
    setIsCameraOpen(true);
  };

  // Handle gallery selection - opens file picker
  const handleSelectGallery = () => {
    galleryInputRef.current?.click();
  };

  // Handle camera capture from CameraCapture component
  const handleCameraCapture = (imageData) => {
    setCapturedImage(imageData);
    setIsCameraOpen(false);
  };

  // Handle image upload from gallery (file input)
  const handleGalleryUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle final submission to backend
  const handleFinalSubmit = async () => {
    setError('');

    if (!vinNumber.trim()) {
      setError('Please enter a VIN number');
      return;
    }

    if (!location) {
      setError('Please fetch GPS location first');
      return;
    }

    if (!capturedImage) {
      setError('Please capture vehicle image first');
      return;
    }

    // Prepare payload for backend
    const backendPayload = {
      vin: vinNumber,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        timestamp: location.timestamp,
      },
      image: capturedImage,
    };

    // Log payload for debugging
    console.log('='.repeat(80));
    console.log('📤 BACKEND PAYLOAD - Vehicle Park Data');
    console.log('='.repeat(80));
    console.log('\n🚗 Vehicle Information:');
    console.log('   VIN Number:', backendPayload.vin);
    console.log('\n📍 GPS Location Data:');
    console.log('   Latitude:', backendPayload.location.latitude);
    console.log('   Longitude:', backendPayload.location.longitude);
    console.log('   Accuracy:', `±${backendPayload.location.accuracy.toFixed(2)} meters`);
    console.log('   Timestamp:', backendPayload.location.timestamp);
    console.log('\n📸 Image Data:');
    console.log('   Format: Base64 encoded');
    console.log('   Size:', `${(backendPayload.image.length / 1024).toFixed(2)} KB`);
    console.log('   Preview:', backendPayload.image.substring(0, 100) + '...');
    console.log('\n📦 Complete Payload Object:');
    console.log(JSON.stringify(backendPayload, null, 2));
    console.log('\n' + '='.repeat(80));

    try {
      console.log('🚀 Sending request to backend API...');
      const response = await parkVehicle(backendPayload);
      console.log('✅ SUCCESS - Backend Response:');
      console.log(JSON.stringify(response, null, 2));
      console.log('='.repeat(80) + '\n');

      // Handle backend response format: { "status": "success", "image_path": "gs://..." }
      if (response.status === 'success') {
        const successMessage = `✅ Vehicle parked successfully!\n\nVIN: ${vinNumber}\nImage stored at: ${response.image_path || 'Backend storage'}\n\nVehicle data has been submitted to the backend.`;
        alert(successMessage);

        // Reset form after successful submission
        resetParkVehicle();

        return response;
      } else {
        // Handle unexpected response format
        throw new Error(response.details || 'Unexpected response from server');
      }
    } catch (error) {
      console.error('❌ ERROR - Failed to park vehicle:');
      console.error(error);
      console.log('='.repeat(80) + '\n');

      // Display detailed error message
      const errorMessage = error.message || 'Failed to park vehicle. Please try again.';
      setError(`Failed to submit: ${errorMessage}`);

      // Show error alert
      alert(`❌ Failed to park vehicle\n\n${errorMessage}\n\nPlease check your connection and try again.`);

      throw error;
    }
  };

  // Handle QR scan success
  const handleScanSuccess = (decodedText) => {
    setVinNumber(decodedText);
    setIsScanning(false);
    setError('');
  };

  // Reset all park vehicle state
  const resetParkVehicle = () => {
    setVinNumber('');
    setLocation(null);
    setCapturedImage(null);
    setIsScanning(false);
    setIsImageModalOpen(false);
    setIsCameraOpen(false);
    setError('');
  };

  return {
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
  };
};
