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
      // Handle Flask backend error format: { "status": "error", "details": [...] }
      const errorMessage = errorData.details
        ? (Array.isArray(errorData.details) ? errorData.details.join(', ') : errorData.details)
        : (errorData.message || `Server error: ${response.status} ${response.statusText}`);
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Validate response format from Flask backend
    // Expected: { "status": "success", "image_path": "gs://..." }
    if (!data.status) {
      throw new Error('Invalid response format from server');
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
};

/**
 * Fetch vehicle location from the database by VIN
 * Flask endpoint: GET /location?vin={vin}
 * @param {string} vin - Vehicle Identification Number
 * @returns {Promise<Object>} Vehicle location data
 * Response format: {
 *   "status": "success",
 *   "data": {
 *     "vin": "...",
 *     "location": {
 *       "latitude": number,
 *       "longitude": number,
 *       "accuracy": number,
 *       "timestamp": "ISO string"
 *     }
 *   }
 * }
 */
export const fetchVehicleLocation = async (vin) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    // Flask backend uses query parameter: /location?vin={vin}
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRACK_VEHICLE}?vin=${encodeURIComponent(vin)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Handle Flask backend error format: { "status": "error", "message": "..." }
      if (response.status === 404 || errorData.message === 'VIN not found') {
        throw new Error('Vehicle not found. Please check the VIN number.');
      }

      const errorMessage = errorData.message || `Server error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Validate response format from Flask backend
    // Expected: { "status": "success", "data": { "vin": "...", "location": {...} } }
    if (!data.status || data.status !== 'success') {
      throw new Error(data.message || 'Invalid response format from server');
    }

    if (!data.data || !data.data.location) {
      throw new Error('Location data not found in response');
    }

    return data;
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
