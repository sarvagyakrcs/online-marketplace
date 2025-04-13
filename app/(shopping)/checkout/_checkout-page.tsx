"use client";

import Banner1 from '@/components/banner/banner-1';
import { PermissionState, useGeolocation } from '@/hooks/use-geolocation';
import { CheckoutSession } from '@/modules/products/types/checkout';
import React, { useState } from 'react'


type Props = {
  checkoutSession: CheckoutSession
}

const CheckoutPageComponent = (props: Props) => {
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

  return (
    <div className=''>
      {permissionState === PermissionState.PROMPT && (
        <Banner1
          title="Location access not given"
          description="Allowing location access makes it easier to personalize your experience and autofill your address. You can still continue by entering it manually."
          ctaText="Try again"
          onDismiss={() => { }}
          ctaAction={requestLocationPermission}
        />
      )}

      {permissionState === PermissionState.DENIED && (
        <Banner1
          title="Location access denied"
          description="Allowing location access makes it easier to personalize your experience and autofill your address. You can still continue by entering it manually."
        />
      )}

      {permissionState === PermissionState.UNKNOWN && (
        <Banner1
          title="Location access unknown"
          description="Allowing location access makes it easier to personalize your experience and autofill your address. You can still continue by entering it manually."
          ctaText="Allow"
          ctaAction={requestLocationPermission}
          onDismiss={() => { }}
        />
      )}


    </div>
  )
}

export default CheckoutPageComponent