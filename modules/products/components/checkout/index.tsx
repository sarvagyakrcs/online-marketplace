"use client"
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react'
import { CheckoutSession } from '../../types/checkout';
import { useLocalStorage } from '@mantine/hooks';


type Props = {
    checkoutSession: CheckoutSession
}

const Checkout = ({ checkoutSession }: Props) => {
    const [, setValue] = useLocalStorage({
        key: 'checkout-session',
        defaultValue: {},
    });
    useEffect(() => {
        setValue(checkoutSession);
    }, [])
    return <Button color='sky' href={"/checkout"}>
        Checkout
    </Button>

}

export default Checkout;