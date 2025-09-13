// src/app/dashboard/layout.tsx
import { ReactNode } from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import SecondaryNavbar from '@/components/Navbar/secondary-navbar.client'
import ClientWrapper from '@/app/Dashboard/client-wrapper' // we'll create this

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const {
    data, error: userErr
  } = await supabase.auth.getUser()

  if (userErr || !data?.user) {
    // Optionally redirect here or render null
    redirect('/Login')
  }
   const user = data.user;
  return (
    <ClientWrapper>
      <SecondaryNavbar user={user} />
      {children}
    </ClientWrapper>
  )
}
