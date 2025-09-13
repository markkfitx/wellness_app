'use client'

import type { User } from '@supabase/supabase-js'

type SecondaryNavbarProps = {
  user: User | null
}

export default function SecondaryNavbar({ user }: SecondaryNavbarProps) {
  return (
    <nav className="py-2 flex items-center justify-between gap-4">
      <div className="flex flex-row items-center gap-10">
       
        <h1 className="text-lg">
          {/*Welcome {session?.user?.email ?? 'Guest'}*/}
        </h1>
      </div>
    </nav>
  )
}
