import { useState, useEffect, useCallback } from 'react';
import { CountryCode, COUNTRY_MAP, CountryInfo } from '../types/country';

// Define permission states
export enum PermissionState {
  GRANTED = "granted",
  DENIED = "denied",
  PROMPT = "prompt",
  UNKNOWN = "unknown",
}

interface LocationInfo {
  country: CountryInfo | null;
  city: string | null;
  postalCode: string | null;
  region: string | null;
  loading: boolean;
  error: string | null;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  permissionGranted: boolean;
  permissionState: PermissionState;
}

interface GeocodingResponse {
  address: {
    country_code: string;
    country: string;
    postcode: string;
    state: string;
    city: string;
  };
}

export const useGeolocation = () => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    country: null,
    city: null,
    postalCode: null,
    region: null,
    loading: true,
    error: null,
    coordinates: {
      latitude: null,
      longitude: null,
    },
    permissionGranted: false,
    permissionState: PermissionState.UNKNOWN,
  });

  const checkPermissionState = useCallback(async () => {
    if (!navigator.permissions || !navigator.permissions.query) {
      // Browser doesn't support permissions API
      return PermissionState.UNKNOWN;
    }

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      return result.state as PermissionState;
    } catch (error) {
      console.error("Error checking geolocation permission:", error);
      return PermissionState.UNKNOWN;
    }
  }, []);

  const fetchLocationData = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocationInfo(prev => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by your browser",
        permissionGranted: false,
      }));
      return;
    }

    setLocationInfo(prev => ({
      ...prev,
      loading: true,
    }));

    // Check current permission state
    const permState = await checkPermissionState();
    
    setLocationInfo(prev => ({
      ...prev,
      permissionState: permState,
      permissionGranted: permState === PermissionState.GRANTED,
    }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Update permission states since user allowed
          setLocationInfo(prev => ({
            ...prev,
            permissionGranted: true,
            permissionState: PermissionState.GRANTED,
            coordinates: {
              latitude,
              longitude,
            },
          }));
          
          // Reverse geocoding to get location details
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { headers: { 'Accept': 'application/json' } }
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch location data');
          }
          
          const data = await response.json() as GeocodingResponse;
          
          // Convert country code to our enum
          const countryCode = data.address.country_code.toUpperCase() as CountryCode;
          const countryInfo = COUNTRY_MAP[countryCode] || {
            name: data.address.country,
            code: countryCode as CountryCode,
            phoneCode: "",
          };
          
          setLocationInfo(prev => ({
            ...prev,
            country: countryInfo,
            city: data.address.city || null,
            postalCode: data.address.postcode || null,
            region: data.address.state || null,
            loading: false,
            error: null,
          }));
        } catch (error) {
          setLocationInfo(prev => ({
            ...prev,
            loading: false,
            error: `Error fetching location data: ${error instanceof Error ? error.message : String(error)}`,
          }));
        }
      },
      (error) => {
        // Handle specific geolocation errors
        let permState = PermissionState.UNKNOWN;
        
        if (error.code === 1) { // PERMISSION_DENIED
          permState = PermissionState.DENIED;
        }
        
        setLocationInfo(prev => ({
          ...prev,
          loading: false,
          error: `Geolocation error: ${error.message}`,
          permissionGranted: false,
          permissionState: permState,
        }));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, [checkPermissionState]);

  // Initial location fetch
  useEffect(() => {
    fetchLocationData();
  }, [fetchLocationData]);

  // Function to request permission again
  const requestLocationPermission = useCallback(() => {
    fetchLocationData();
  }, [fetchLocationData]);

  return {
    ...locationInfo,
    requestLocationPermission,
  };
};