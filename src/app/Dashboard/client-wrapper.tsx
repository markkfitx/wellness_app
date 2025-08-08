'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/context/supabase-session-provider'
import SidebarProvider from '@/components/wrappers/sidebar-wrapper'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Sidebar from '@/components/sidebar'
import PrimaryNavbar from '@/components/Navbar/primary_navbar'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { session } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/Login')
    }
  }, [session])

  if (!session) return null

  return (
    <ThemeProvider defaultTheme="light" attribute="class" enableSystem={false}>
      <SidebarProvider>
        <Sidebar />
        <main className="w-full flex flex-col">
          <div className="flex flex-col gap-1">
            <PrimaryNavbar />
            {/* SecondaryNavbar is now server-rendered and passed into layout.tsx */}
          </div>
          <div className="px-5">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}
