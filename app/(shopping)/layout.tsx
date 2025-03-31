import ShoppingLayout from '@/modules/shopping/layout/shopping-layout'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <ShoppingLayout>
        { children }
    </ShoppingLayout>
  )
}

export default layout