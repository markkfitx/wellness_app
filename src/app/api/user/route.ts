import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = session;

  const { data: profile, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error('Profile fetch error:', error.message);
    return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
  }

  return NextResponse.json({ user: profile });
}
