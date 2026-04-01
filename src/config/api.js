export const API_CONFIG = {
  // Base URL for the backend API
  // Development: http://localhost:8080 (Flask backend)
  // Production Backend: http://mdp-dev-sbu-vin-api.m-devsecops.com
  // Production: Use VITE_API_BASE_URL environment variable
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',

  ENDPOINTS: {
    PARK_VEHICLE: '/upload', // Flask endpoint: POST /upload
    TRACK_VEHICLE: '/location', // Flask endpoint: GET /location?vin={vin}
  },

  TIMEOUT: 30000, // 30 seconds
};
