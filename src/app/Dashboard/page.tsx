import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect('/Login'); // or show fallback
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      {/* More content */}
    </div>
  );
}
