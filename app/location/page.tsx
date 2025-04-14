"use client";
import { PermissionState, useGeolocation } from '@/hooks/use-geolocation';
import React from 'react';

const LocationDisplay: React.FC = () => {
  const { 
    country, 
    city, 
    postalCode, 
    region, 
    loading, 
    error, 
    permissionGranted,
    permissionState,
    requestLocationPermission 
  } = useGeolocation();

  if (loading) return <div>Loading location data...</div>;
  
  if (!permissionGranted) {
    return (
      <div>
        <h2>Location access is required</h2>
        <p>Current permission status: {permissionState}</p>
        {permissionState === PermissionState.DENIED && (
          <p>You&apos;ve denied location access. Please enable location in your browser settings.</p>
        )}
        <button onClick={requestLocationPermission}>
          {permissionState === PermissionState.DENIED 
            ? "Try again" 
            : "Allow location access"}
        </button>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Your Location</h1>
      {country && (
        <div>
          <p>Country: {country.name} ({country.code})</p>
          <p>Phone Code: {country.phoneCode}</p>
        </div>
      )}
      {city && <p>City: {city}</p>}
      {postalCode && <p>Postal Code: {postalCode}</p>}
      {region && <p>Region/State: {region}</p>}
    </div>
  );
};

export default LocationDisplay;