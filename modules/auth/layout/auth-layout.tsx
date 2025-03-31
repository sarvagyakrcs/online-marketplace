import React from 'react'

type Props = {
    children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen bg-background">
      {children}
    </div>
  )
}

export default AuthLayout