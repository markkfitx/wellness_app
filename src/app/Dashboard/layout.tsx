// src/app/dashboard/layout.tsx
import { ReactNode } from 'react'
import { createClient } from '@/utils/supabase/server'
import SecondaryNavbar from '@/components/Navbar/secondary-navbar.client'
import ClientWrapper from '@/app/Dashboard/client-wrapper' // we'll create this

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Optionally redirect here or render null
  }

  return (
    <ClientWrapper>
      <SecondaryNavbar session={session} />
      {children}
    </ClientWrapper>
  )
}
