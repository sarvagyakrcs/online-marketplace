import React from 'react'
import ShoppingNavbar from '../components/shopping-nav'

type Props = {
    children: React.ReactNode
}

const ShoppingLayout = ({ children }: Props) => {
  return (
    <main>
        <ShoppingNavbar />
        <div className="flex h-screen w-screen items-center justify-center gap-3">
            {children}
        </div>
    </main>
  )
}

export default ShoppingLayout