/**
 * Application Constants
 * Centralized configuration and constant values
 */

// Screen/Route names
export const SCREENS = {
  HOME: 'home',
  PARK: 'park',
  TRACK: 'track',
  REPORT: 'report',
};

// Geolocation options
export const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

// App metadata
export const APP_METADATA = {
  title: 'Vehicle Geo Detection',
  subtitle: 'Real-time Location Tracking',
  description: 'Track and manage vehicle locations in real-time',
  copyright: 'Mahindra AI',
};

// Feature messages
export const MESSAGES = {
  PARK_SUCCESS: '✅ Vehicle data submitted successfully!\n\nCheck console (F12) to see the payload that would be sent to backend.',
  COMING_SOON: 'This feature is under development',
  LOCATION_ERROR: 'Please enable location services to use this feature',
  VIN_REQUIRED: 'Please enter a VIN number',
  IMAGE_REQUIRED: 'Please capture vehicle image first',
  LOCATION_REQUIRED: 'Please fetch GPS location first',
};

// Card configurations for home screen
export const HOME_CARDS = [
  {
    id: 'park',
    title: 'Park Vehicle',
    description: 'Register vehicle location in the plant',
    screen: SCREENS.PARK,
    icon: 'Car',
  },
  {
    id: 'track',
    title: 'Track Vehicle',
    description: 'Find vehicle location in real-time',
    screen: SCREENS.TRACK,
    icon: 'MapPin',
  },
  {
    id: 'report',
    title: 'Download Report',
    description: 'Export vehicle tracking data',
    screen: SCREENS.REPORT,
    icon: 'FileDown',
  },
];
