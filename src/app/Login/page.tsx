import { LoginForm } from '@/components/auth/login-form'
import {createClient} from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data, error : userErr} = await supabase.auth.getUser();

  if (userErr || data?.user) {
    await fetch('/api/user', { method: 'GET' });;
    redirect('/Dashboard');
  }
  return (
    <div className="md:min-w-[700px] md:max-w-[800px] py-10">
      <LoginForm />
    </div>
  )
}
