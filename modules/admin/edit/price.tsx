"use client"
import { editPrice } from '@/actions/(admin)/edit/price'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

type Props = {
    price: number
    productId: string
}

const PriceEdit = ({ price, productId }: Props) => {
    const [priceState, setPriceState] = React.useState<number>(price)

    const {
        mutate,
        isPending
    } = useMutation({
        mutationKey: ['price-edit', productId],
        mutationFn: editPrice,
        onSuccess: () => {
            toast.success('Price updated')
        },
        onError: (error) => {
            toast.error('Error editing price')
            console.error('Error editing price:', error)
        }
    })

    const handleBlur = () => {
        if (priceState !== price) {
            mutate({ price: priceState, productId })
        }
    }

    return (
        <input
            type="number"
            value={priceState}
            onChange={(e) => setPriceState(Number(e.target.value))}
            onBlur={handleBlur}
            className="border p-2 border-gray-300 ml-2 rounded-xl max-w-20 bg-transparent"
            placeholder="Price"
            min={0}
            step={0.01}
            disabled={isPending}
            required
        />
    )
}

export default PriceEdit
