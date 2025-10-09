// app/providers.tsx
'use client'

import { NotificationProvider } from '@/contexts/NotificationContext'
import { NotificationContainer } from '@/components/NotificationToast'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          {children}
          <NotificationContainer />
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  )
}