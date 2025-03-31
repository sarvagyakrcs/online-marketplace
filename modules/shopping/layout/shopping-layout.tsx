import React from 'react'
import ShoppingNavbar from '../components/shopping-nav'
import Footer from '../components/footer'

type Props = {
    children: React.ReactNode
}

const ShoppingLayout = ({ children }: Props) => {
  return (
    <main>
        <ShoppingNavbar />
        <div className="flex min-h-screen w-screen items-center justify-center gap-3">
            {children}
        </div>
        <Footer />
    </main>
  )
}

export default ShoppingLayout