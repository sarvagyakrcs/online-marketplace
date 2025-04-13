"use client"
import { Button } from '@/components/ui/button'
import useCart from '@/hooks/use-cart'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { FaStripe } from 'react-icons/fa'
import Image from 'next/image'

const StripeCheckout = () => {
  const { items: cartItems } = useCart();
  const [loading, setLoading] = React.useState(false);
  const disabled = cartItems.length === 0 || loading;

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

  const onCheckout = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: cartItems.length > 0 ? JSON.stringify({ items: cartItems }) : null,
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId,
      });
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred:', error);
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      className={cn(loading && "cursor-progress", 'w-full')}
      disabled={disabled}
      onClick={() => onCheckout()}
      color='indigo'
    >
      {loading ? <Loader className='h-4 w-4 animate-spin' /> : <FaStripe className='h-4 w-4' />}
    </Button>
  )
}

export default StripeCheckout;