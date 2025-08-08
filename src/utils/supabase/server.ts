// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies as nextCookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = nextCookies() as any;
 // ✅ correct usage — no await

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (e) {
            // expected if called in a context that can't set cookies (e.g. RSC)
          }
        },
      },
    }
  )
}
