import { LoginForm } from '@/components/auth/login-form'
import {createClient} from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    redirect('/Dashboard');
  }
  return (
    <div className="container py-10">
      <LoginForm />
    </div>
  )
}
