import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';        // ensure Node APIs are available
export const dynamic = 'force-dynamic'; // avoid stale cache for auth

export async function GET() {
  const supabase = await createClient();

  const { data: { user }, error: userErr } = await supabase.auth.getUser();

  if (userErr || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { data: userData, error: profErr } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (profErr) {
    return NextResponse.json({ error: profErr.message }, { status: 500 });
  }

  // ✅ Use NextResponse to set the cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: 'profiles',
    value: JSON.stringify(userData),
    httpOnly: false, // true if you don’t want client JS to read it
    maxAge: 60 * 60, // 1 hour
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });

  // Optional: prevent caching by intermediaries
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
