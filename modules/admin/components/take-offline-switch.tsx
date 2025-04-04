'use client'

import { useState } from 'react'
import { Switch } from '@headlessui/react'
import type { $Enums, Prisma } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { takeProductOffline } from '@/actions/(admin)/product/take-product-offline'

type Props = {
    product: Prisma.ProductGetPayload<{
        include: {
            category: true,
            images: true,
            videos: true,
        }
    }>
}

export default function TakeOfflineSwitch({ product }: Props) {
  const [enabled, setEnabled] = useState<$Enums.Avaiavility>(product.avaiavility)

  const mutation = useMutation({
    mutationKey: ["take-product-offline", product.id],
    mutationFn: (newAvailability: $Enums.Avaiavility) => takeProductOffline(product.id, newAvailability),
    
    // Optimistic UI Update
    onMutate: async (newAvailability) => {
        const previousState = enabled
        setEnabled(newAvailability)
        toast.loading("Updating product availability...", { id: "take-product-offline" })
        return { previousState }
    },

    // Success Handling
    onSuccess: () => {
        toast.success("Product availability updated!", { id: "take-product-offline" })
    },

    // Rollback on Error
    onError: (error, _, context) => {
        console.error(error)
        setEnabled(context?.previousState || product.avaiavility)
        toast.error("Failed to update availability", { id: "take-product-offline" })
    }
  })

  const handleToggle = () => {
      const newAvailability = enabled === "IN_STOCK" ? "OUT_OF_STOCK" : "IN_STOCK"
      mutation.mutate(newAvailability)
  }

  return (
    <Switch
      checked={enabled === "IN_STOCK"}
      onChange={handleToggle}
      className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:outline-hidden data-checked:bg-slate-600"
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out group-data-checked:translate-x-5"
      />
    </Switch>
  )
}