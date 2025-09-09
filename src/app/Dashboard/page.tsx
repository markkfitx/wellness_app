import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import WelcomeWidget from '@/components/Widgets/welcome';
export default async function Dashboard() {
  const supabase = await createClient();

  const {data: { session },} = await supabase.auth.getSession();
  
  if (!session?.user) {
    redirect('/Login'); // or show fallback
  }
  return (
    <div>
      <WelcomeWidget></WelcomeWidget>
      
    </div>
  );
}
