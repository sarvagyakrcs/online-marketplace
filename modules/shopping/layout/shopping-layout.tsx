import React from 'react'
import ShoppingNavbar from '../components/shopping-nav'

type Props = {
    children: React.ReactNode
}

const ShoppingLayout = ({ children }: Props) => {
  return (
    <main className='h-full grainy'>
        <ShoppingNavbar />
        <div className="flex w-screen items-center justify-center gap-3">
            {children}
        </div>
        {/* <Footer /> */}
    </main>
  )
}

export default ShoppingLayout