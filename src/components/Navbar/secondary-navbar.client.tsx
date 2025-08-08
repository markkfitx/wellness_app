'use client'

import SidebarToggler from '../utils/sidebar-toggler'
import type { Session } from '@supabase/supabase-js'

type SecondaryNavbarProps = {
  session: Session | null
}

export default function SecondaryNavbar({ session }: SecondaryNavbarProps) {
  return (
    <nav className="px-5 py-2 flex items-center justify-between gap-4">
      <div className="flex flex-row items-center gap-10">
        <SidebarToggler />
        <h1 className="text-lg">
          Welcome {session?.user?.email ?? 'Guest'}
        </h1>
      </div>
    </nav>
  )
}
