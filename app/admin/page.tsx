import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

async function getAdminData() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const [postsRes, pagesRes, categoriesRes] = await Promise.all([
    supabase.from('posts').select('id, slug, status, published_at', { count: 'exact' }).order('created_at', { ascending: false }).limit(10),
    supabase.from('pages').select('id, slug, status', { count: 'exact' }),
    supabase.from('categories').select('id, slug', { count: 'exact' }),
  ]);

  return {
    user,
    posts: postsRes.data || [],
    postsCount: postsRes.count || 0,
    pagesCount: pagesRes.count || 0,
    categoriesCount: categoriesRes.count || 0,
  };
}

export default async function AdminDashboard() {
  const { user, posts, postsCount, pagesCount, categoriesCount } = await getAdminData();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold text-gray-900 text-sm">لوحة التحكم</span>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{user.email}</span>
            <form action="/admin/logout" method="POST">
              <button type="submit" className="text-red-500 hover:text-red-700">خروج</button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'المقالات', count: postsCount, href: '/admin/posts' },
            { label: 'الصفحات', count: pagesCount, href: '/admin/pages' },
            { label: 'التصنيفات', count: categoriesCount, href: '/admin/categories' },
          ].map((stat) => (
            <Link key={stat.label} href={stat.href}
              className="bg-white rounded border border-gray-200 p-5 hover:border-gray-400 transition-colors">
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.count}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">آخر المقالات</h2>
            <Link href="/admin/posts/new"
              className="text-xs bg-gray-900 text-white px-3 py-1.5 hover:bg-gray-700 transition-colors rounded-sm">
              + إضافة مقال
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100">
              <tr className="text-right">
                <th className="px-5 py-3 text-xs text-gray-500 font-medium">العنوان (Slug)</th>
                <th className="px-5 py-3 text-xs text-gray-500 font-medium">الحالة</th>
                <th className="px-5 py-3 text-xs text-gray-500 font-medium">تاريخ النشر</th>
                <th className="px-5 py-3 text-xs text-gray-500 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map((post: any) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-mono text-xs text-gray-700">{post.slug}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      post.status === 'published'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {post.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString('ar-EG') : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/posts/${post.id}/edit`}
                      className="text-xs text-blue-600 hover:text-blue-800">تعديل</Link>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-gray-400">لا توجد مقالات بعد.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
