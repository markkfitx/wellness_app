// src/app/api/cache-user/route.ts
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();

  const {data: { session }} = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { data: userData, error } = await supabase
    .from('user_data')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Store a JSON string in a cookie
  cookies().set('user_data', JSON.stringify(userData), {
    httpOnly: false, // ❗️Set to true to secure from JS access if needed
    maxAge: 60 * 60, // 1 hour
  });

  return NextResponse.json({ success: true });
}
