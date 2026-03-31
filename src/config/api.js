/**
 * API Configuration
 * Centralized API configuration for the application
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://mdp-dev-sbu-vin-api.m-devsecops.com',
  ENDPOINTS: {
    PARK_VEHICLE: '/park-vehicle',
    TRACK_VEHICLE: '/track-vehicle',
  },
  TIMEOUT: 30000, // 30 seconds
};
