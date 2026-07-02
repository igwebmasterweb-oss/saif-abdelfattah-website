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
    <div dir="rtl">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-[#1e3a5f] mb-1">مرحباً بك 👋</h1>
        <p className="text-sm text-[#4a4a4a]">
          مدخول بحساب: <span className="font-medium text-[#1e3a5f]">{user.email}</span>
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'المقالات', count: postsCount, href: '/admin/posts', color: '#1e3a5f' },
          { label: 'الصفحات', count: pagesCount, href: '/admin/pages', color: '#1e3a5f' },
          { label: 'التصنيفات', count: categoriesCount, href: '/admin/categories', color: '#1e3a5f' },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded border border-[#e8e6e3] p-6 hover:shadow-md transition-shadow group"
          >
            <div
              className="text-4xl font-bold mb-2 group-hover:text-[#e8601c] transition-colors"
              style={{ color: stat.color }}
            >
              {stat.count}
            </div>
            <div className="text-sm text-[#4a4a4a] font-medium">{stat.label}</div>
            <div className="mt-3 w-8 h-0.5 bg-[#e8601c] rounded-full" />
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-8">
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-[#e8601c] text-white text-sm font-medium px-5 py-2 rounded hover:bg-[#c4511a] transition-colors"
        >
          + إضافة مقال
        </Link>
        <Link
          href="/admin/pages/new"
          className="inline-flex items-center gap-2 border border-[#1e3a5f] text-[#1e3a5f] text-sm font-medium px-5 py-2 rounded hover:bg-[#1e3a5f] hover:text-white transition-colors"
        >
          + إضافة صفحة
        </Link>
      </div>

      {/* Recent posts table */}
      <div className="bg-white rounded border border-[#e8e6e3]">
        <div className="px-6 py-4 border-b border-[#e8e6e3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-[#e8601c] rounded-full" />
            <h2 className="font-semibold text-[#1e3a5f] text-sm">آخر المقالات</h2>
          </div>
          <Link
            href="/admin/posts"
            className="text-xs text-[#e8601c] hover:text-[#c4511a] transition-colors font-medium"
          >
            عرض الكل ←
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#f0eee9] bg-[#fafaf9]">
              <th className="px-6 py-3 text-right text-xs text-[#8a8a8a] font-medium">الرابط (Slug)</th>
              <th className="px-6 py-3 text-right text-xs text-[#8a8a8a] font-medium">الحالة</th>
              <th className="px-6 py-3 text-right text-xs text-[#8a8a8a] font-medium">تاريخ النشر</th>
              <th className="px-6 py-3 text-right text-xs text-[#8a8a8a] font-medium">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5f4f2]">
            {posts.map((post: any) => (
              <tr key={post.id} className="hover:bg-[#fafaf9]">
                <td className="px-6 py-3 font-mono text-xs text-[#4a4a4a]">{post.slug}</td>
                <td className="px-6 py-3">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      post.status === 'published'
                        ? 'bg-[#e8f5e9] text-[#2e7d32]'
                        : 'bg-[#fff8e1] text-[#f57f17]'
                    }`}
                  >
                    {post.status === 'published' ? 'منشور' : 'مسودة'}
                  </span>
                </td>
                <td className="px-6 py-3 text-xs text-[#8a8a8a]">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString('ar-EG')
                    : '—'}
                </td>
                <td className="px-6 py-3">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-xs text-[#1e3a5f] hover:text-[#e8601c] transition-colors font-medium"
                  >
                    تعديل
                  </Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-[#b0aeaa] text-sm">
                  لا توجد مقالات بعد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
