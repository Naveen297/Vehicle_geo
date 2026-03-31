import { useState } from 'react';

/**
 * Custom hook for handling geolocation functionality
 * Returns getCurrentLocation function and loading state
 */
export const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      setError('');
      setIsLoading(true);

      if (!navigator.geolocation) {
        const errorMsg = 'Geolocation is not supported by this browser.';
        setError(errorMsg);
        setIsLoading(false);
        reject(new Error(errorMsg));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString(),
          };
          setIsLoading(false);
          resolve(locationData);
        },
        (error) => {
          const errorMsg = `Error getting location: ${error.message}. Please enable location services.`;
          setError(errorMsg);
          setIsLoading(false);
          reject(new Error(errorMsg));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  return { getCurrentLocation, isLoading, error, setError };
};
