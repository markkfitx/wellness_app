// src/app/login/page.tsx
// see src/components/wrappers/login-wrapper for full page
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { LoginShell } from '@/components/wrappers/login-wrapper';

export default async function LoginPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    redirect('/Dashboard');
  }

  return <LoginShell />;
}
