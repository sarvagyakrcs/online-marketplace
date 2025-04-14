"use client";
import { CheckoutSession } from '@/modules/products/types/checkout';
import { useLocalStorage } from '@mantine/hooks';
import React from 'react'
import CheckoutPageComponent from '../../../modules/checkout/components/_checkout-page';

const CheckoutPage = () => {
  const [value] = useLocalStorage({
    key: 'checkout-session',
    defaultValue: {},
  });
  const checkoutSession = value as CheckoutSession;
  return (
    <CheckoutPageComponent checkoutSession={checkoutSession} />
  )
}

export default CheckoutPage
