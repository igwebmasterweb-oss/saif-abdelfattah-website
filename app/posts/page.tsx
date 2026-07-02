import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const translations = {
  ar: {
    title: 'المقالات',
    subtitle: 'أفكار وتحليلات في الفكر الحضاري والسياسي والاجتماعي',
    read_more: 'اقرأ المزيد',
    no_posts: 'لا توجد مقالات بعد',
    lang_switch: 'English',
    lang_href: '/?lang=en',
    nav_about: 'عن الكاتب',
    nav_posts: 'المقالات',
    nav_books: 'الكتب',
    nav_contact: 'تواصل',
  },
  en: {
    title: 'Articles',
    subtitle: 'Thoughts and analysis on civilizational, political, and social thought',
    read_more: 'Read more',
    no_posts: 'No articles yet',
    lang_switch: 'عربي',
    lang_href: '/?lang=ar',
    nav_about: 'About',
    nav_posts: 'Articles',
    nav_books: 'Books',
    nav_contact: 'Contact',
  },
};

async function getPosts(locale: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );
  const { data } = await supabase
    .from('posts')
    .select(`id, slug, published_at, featured_image_url,
      post_translations!inner(title, excerpt, locale)`)
    .eq('status', 'published')
    .eq('post_translations.locale', locale)
    .order('published_at', { ascending: false });
  return data || [];
}

interface Props { searchParams: Promise<{ lang?: string }>; }

export default async function PostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const locale = params.lang === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const t = translations[locale];
  const posts = await getPosts(locale);

  return (
    <div dir={dir} lang={locale} className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b border-warm-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/?lang=${locale}`} className="text-navy text-lg font-bold tracking-tight hover:text-navy-700 transition-colors">
            {isAr ? 'سيف عبد الفتاح' : 'Saif Abd Al-Fattah'}
          </Link>
          <div className="flex items-center gap-1">
            {[
              { label: t.nav_about, href: `/about?lang=${locale}` },
              { label: t.nav_posts, href: `/posts?lang=${locale}` },
              { label: t.nav_books, href: `/books?lang=${locale}` },
              { label: t.nav_contact, href: `/contact?lang=${locale}` },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="px-3 py-2 text-sm text-gray-600 hover:text-navy rounded transition-colors">
                {label}
              </Link>
            ))}
            <Link href={t.lang_href} className="ml-2 text-xs border border-navy-300 text-navy-600 rounded px-3 py-1.5 hover:bg-navy hover:text-white transition-colors">
              {t.lang_switch}
            </Link>
          </div>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="bg-white py-14 border-b border-warm-200">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">{t.title}</h1>
          <div className="w-10 h-1 rounded-full bg-brand mb-4" />
          <p className="text-gray-500">{t.subtitle}</p>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="bg-warm-50 py-14">
        <div className="max-w-6xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="text-gray-400 text-center py-20">{t.no_posts}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => {
                const tr = Array.isArray(post.post_translations)
                  ? post.post_translations[0]
                  : post.post_translations;
                const date = post.published_at
                  ? new Date(post.published_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : '';
                return (
                  <article key={post.id} className="bg-white border border-warm-200 rounded hover:shadow-md transition-shadow group">
                    <Link href={`/posts/${post.slug}?lang=${locale}`}>
                      {post.featured_image_url ? (
                        <div className="aspect-video overflow-hidden rounded-t">
                          <img src={post.featured_image_url} alt={tr?.title || ''}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : (
                        <div className="aspect-video bg-navy-50 rounded-t flex items-center justify-center">
                          <span className="text-navy-200 text-3xl">★</span>
                        </div>
                      )}
                      <div className="p-5">
                        {date && <p className="text-xs text-gray-400 mb-2">{date}</p>}
                        <h2 className="text-sm font-semibold text-navy mb-2 line-clamp-2 group-hover:text-brand transition-colors">
                          {tr?.title}
                        </h2>
                        {tr?.excerpt && (
                          <p className="text-xs text-gray-500 line-clamp-3 mb-4">{tr.excerpt}</p>
                        )}
                        <span className="text-xs font-medium text-brand">{t.read_more} ←</span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-lg font-bold">{isAr ? 'أ.د. سيف الدين عبد الفتاح' : 'Prof. Saif Abd Al-Fattah'}</p>
            <div className="flex gap-5 text-sm text-navy-300">
              <Link href={`/posts?lang=${locale}`} className="hover:text-white">{t.nav_posts}</Link>
              <Link href={`/about?lang=${locale}`} className="hover:text-white">{t.nav_about}</Link>
              <Link href={`/contact?lang=${locale}`} className="hover:text-white">{t.nav_contact}</Link>
            </div>
          </div>
          <div className="border-t border-navy-700 mt-8 pt-6 text-xs text-navy-400 text-center">
            {isAr ? '© 2025 جميع الحقوق محفوظة' : '© 2025 All rights reserved'}
          </div>
        </div>
      </footer>
    </div>
  );
}
