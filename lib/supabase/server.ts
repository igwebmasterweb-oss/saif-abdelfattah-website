import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/** عميل Supabase من جهة الخادم (للقراءة العامة) */
export async function getServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );
}
