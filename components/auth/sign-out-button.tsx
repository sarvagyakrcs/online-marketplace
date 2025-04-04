"use client"
import { signOut } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import type { Session } from 'next-auth'

const SignOutButton = ({ session }: { session: Session | null }) => {
    const router = useRouter()
    
    const handleSignOut = async () => {
        const loadingToast = toast.loading('Signing out...')
        try {
            await signOut({ 
                redirect: false,
                callbackUrl: '/'
            })
            toast.success('Signed out successfully', {
                id: loadingToast
            })
            router.push('/')
            router.refresh()
        } catch {
            toast.error('Failed to sign out', {
                id: loadingToast
            })
        }
    }

    return session ? (
        <Button 
            onClick={handleSignOut} 
            outline
            className="mx-6"
        >
            Sign Out
        </Button>
    ) : null
}

export default SignOutButton