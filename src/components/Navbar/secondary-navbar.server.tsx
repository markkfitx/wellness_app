import NavbarClient from '@/components/Navbar/secondary-navbar.client'
import { createClient } from '@/utils/supabase/server'

export default async function SecondaryNavbar() {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()
  const user = data.user
  return (
    <NavbarClient user={user} />
  )
}
