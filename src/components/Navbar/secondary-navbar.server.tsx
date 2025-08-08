import NavbarClient from '@/components/Navbar/secondary-navbar.client'
import { createClient } from '@/utils/supabase/server'

export default async function SecondaryNavbar() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <NavbarClient session={session} />
  )
}
