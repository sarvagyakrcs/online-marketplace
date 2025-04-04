"use server"
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import AdminHeader from './_components/admin-header'
import Footer from '@/modules/shopping/components/footer'

type Props = {
    children: React.ReactNode
}

const AdminLayout = async ({ children }: Props) => {
    const session = await auth()
    if (session?.user.role !== "ADMIN") {
        redirect("/home")
    }
    return (
        <div className="grainy" suppressHydrationWarning>
            <AdminHeader />
            {children}
            <Footer />
        </div>
    )
}

export default AdminLayout