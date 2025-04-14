"use client";

import Banner1 from '@/components/banner/banner-1';
import { PermissionState, useGeolocation } from '@/hooks/use-geolocation';
import { CheckoutSession } from '@/modules/products/types/checkout';
import React from 'react'
import CheckoutForm from './_checkout-form';
import ItemsSummary from './_items-summary';


type Props = {
  checkoutSession: CheckoutSession
}

const CheckoutPageComponent = ({ checkoutSession }: Props) => {
  const {
    permissionState,
    requestLocationPermission
  } = useGeolocation();

  return (
    <div>
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
      <div className="w-screen flex items-center justify-between">
        <div className="w-1/2 px-10 md:px-24">
          <CheckoutForm />
        </div>
        <div className="w-1/2">
          <ItemsSummary checkoutSession={checkoutSession} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutPageComponent