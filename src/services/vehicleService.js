import { API_CONFIG } from '../config/api';

/**
 * Vehicle Service
 * Handles all API calls related to vehicle operations
 */

/**
 * Park a vehicle in the database
 * @param {Object} vehicleData - Vehicle data including VIN, location, image
 * @returns {Promise<Object>} Response from the server
 */
export const parkVehicle = async (vehicleData) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PARK_VEHICLE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to park vehicle: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
};

/**
 * Fetch vehicle location from the database by VIN
 * @param {string} vin - Vehicle Identification Number
 * @returns {Promise<Object>} Vehicle location data
 */
export const fetchVehicleLocation = async (vin) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRACK_VEHICLE}/${vin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 404) {
        throw new Error('Vehicle not found');
      }
      throw new Error(errorData.message || `Failed to fetch vehicle location: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
};

/**
 * Download vehicle tracking report
 * @param {Object} filters - Report filters (date range, VIN, etc.)
 * @returns {Promise<Blob>} Report file
 */
export const downloadReport = async (filters) => {
  // TODO: Implement actual report generation API call
  throw new Error('Report generation not yet implemented');
};
