'use client';

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/utils/supabase/client'

export function LoginShell() {
   const supabase = createClient()
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']} // or ['google', 'github']
          theme="light" // optional: use 'default', 'dark', or 'magiclink'
          redirectTo={`${window.location.origin}/Dashboard`} // optional for redirect after OAuth
        />
      </div>
    </div>
  );
}
