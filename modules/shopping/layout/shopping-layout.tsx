"use server"
import React from 'react'
import ShoppingNavbar from '../components/shopping-nav'
import { auth } from '@/auth'

type Props = {
    children: React.ReactNode
}

const ShoppingLayout = async ({ children }: Props) => {
  const session = await auth();
  return (
    <main className='h-full grainy'>
        <ShoppingNavbar session={session} />
        <div className="flex w-screen items-center justify-center gap-3">
            {children}
        </div>
        {/* <Footer /> */}
    </main>
  )
}

export default ShoppingLayout