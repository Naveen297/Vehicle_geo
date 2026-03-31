import { useState } from 'react';
import { fetchVehicleLocation } from '../services/vehicleService';

/**
 * Custom hook for managing Track Vehicle functionality
 * Handles VIN input, location fetching, and QR scanning
 */
export const useTrackVehicle = () => {
  const [trackVinNumber, setTrackVinNumber] = useState('');
  const [trackLocation, setTrackLocation] = useState(null);
  const [isTrackScanning, setIsTrackScanning] = useState(false);
  const [isTrackLoading, setIsTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState('');

  // Fetch vehicle location from database
  const handleFetchLocation = async () => {
    setTrackError('');

    if (!trackVinNumber.trim()) {
      setTrackError('Please enter a VIN number');
      return;
    }

    setIsTrackLoading(true);

    try {
      const location = await fetchVehicleLocation(trackVinNumber);
      setTrackLocation(location);
    } catch (err) {
      setTrackError(err.message || 'Vehicle not found in database');
    } finally {
      setIsTrackLoading(false);
    }
  };

  // Handle QR scan success
  const handleTrackScanSuccess = (decodedText) => {
    setTrackVinNumber(decodedText);
    setIsTrackScanning(false);
    setTrackError('');
  };

  // Reset all track vehicle state
  const resetTrackVehicle = () => {
    setTrackVinNumber('');
    setTrackLocation(null);
    setIsTrackScanning(false);
    setTrackError('');
  };

  return {
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
  };
};
