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
      // Call Flask backend: GET /location?vin={vin}
      // Response: { "status": "success", "data": { "vin": "...", "location": {...} } }
      const response = await fetchVehicleLocation(trackVinNumber);

      console.log('='.repeat(80));
      console.log('📍 TRACK VEHICLE - Backend Response');
      console.log('='.repeat(80));
      console.log('\n✅ SUCCESS - Vehicle Found!');
      console.log('\n🚗 Vehicle Information:');
      console.log('   VIN Number:', response.data.vin);
      console.log('\n📍 Location Data:');
      console.log('   Latitude:', response.data.location.latitude);
      console.log('   Longitude:', response.data.location.longitude);
      console.log('   Accuracy:', `±${response.data.location.accuracy} meters`);
      console.log('   Timestamp:', response.data.location.timestamp);
      console.log('\n📦 Complete Response:');
      console.log(JSON.stringify(response, null, 2));
      console.log('\n' + '='.repeat(80));

      setTrackLocation(response.data);
    } catch (err) {
      console.error('❌ ERROR - Failed to fetch vehicle location:');
      console.error(err);
      console.log('='.repeat(80) + '\n');

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
