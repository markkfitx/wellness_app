'use client'
import { useSupabase } from '@/context/supabase-session-provider'
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const { supabase } = useSupabase()

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (

   <a className="flex flex-row gap-2 flex-nowrap items-center" onClick={logout}><LogOut className="h-[1.2rem] w-[1.2rem] mr-2" ></LogOut>Logout</a>
  );
}
