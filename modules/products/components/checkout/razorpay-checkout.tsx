import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

type Props = {}

const RazorpayCheckout = (props: Props) => {
  return (
    <Button color='light'>
        <Image 
            src={"/razorpay-icon.svg"}
            height={200}
            width={200}
            alt="razorpay"
            className='mr-2 w-1/2'
        />
    </Button>
  )
}

export default RazorpayCheckout