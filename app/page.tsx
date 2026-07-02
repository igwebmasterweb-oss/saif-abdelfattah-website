import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getLatestPosts(locale: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data } = await supabase
    .from('posts')
    .select(`
      id, slug, published_at, featured_image_url,
      post_translations!inner(title, excerpt, locale)
    `)
    .eq('status', 'published')
    .eq('post_translations.locale', locale)
    .order('published_at', { ascending: false })
    .limit(6);

  return data || [];
}

interface Props {
  searchParams: Promise<{ lang?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const locale = params.lang === 'en' ? 'en' : 'ar';
  const isAr = locale === 'ar';

  const posts = await getLatestPosts(locale);

  const t = {
    hero_title: isAr ? 'أ.د. سيف الدين عبد الفتاح' : 'Prof. Saif Al-Din Abd Al-Fattah',
    hero_sub: isAr ? 'المدرسة الحضارية' : 'The Civilizational School',
    hero_desc: isAr
      ? 'فكر سياسي إسلامي ، بحث أكاديمي ، وحوار حضاري'
      : 'Islamic Political Thought — Academic Research — Civilizational Dialogue',
    latest_posts: isAr ? 'آخر المقالات' : 'Latest Articles',
    read_more: isAr ? 'اقرأ المزيد' : 'Read more',
    all_posts: isAr ? 'جميع المقالاد' : 'All Articles',
    nav_about: isAr ? 'عن المؤلف' : 'About',
    nav_posts: isAr ? 'المقالات' : 'Articles',
    nav_contact: isAr ? 'تواصل' : 'Contact',
    lang_switch: isAr ? 'English' : 'عربي',
    lang_href: isAr ? '/?lang=en' : '/',
    no_posts: isAr ? 'لا توجد مقالات بعد.' : 'No articles yet.',
  };

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} lang={locale} className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/?lang=${locale}`} className="text-lg font-bold text-gray-900 tracking-tight">
            {isAr ? 'سيف عبد الفتاح' : 'Saif Abd Al-Fattah'}
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href={`/about?lang=${locale}`} className="hover:text-gray-900 transition-colors">{t.nav_about}</Link>
            <Link href={`/posts?lang=${locale}`} className="hover:text-gray-900 transition-colors">{t.nav_posts}</Link>
            <Link href={`/contact?lang=${locale}`} className="hover:text-gray-900 transition-colors">{t.nav_contact}</Link>
            <Link href={t.lang_href} className="text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 transition-colors">
              {t.lang_switch}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">{t.hero_title}</h1>
        <p className="text-xl text-gray-500 mb-3 font-light">{t.hero_sub}</p>
        <p className="text-base text-gray-400">{t.hero_desc}</p>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      {/* Latest Posts */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-10">{t.latest_posts}</h2>

        {posts.length === 0 ? (
          <p className="text-gray-400">{t.no_posts}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => {
              const translation = Array.isArray(post.post_translations)
                ? post.post_translations[0]
                : post.post_translations;
              return (
                <article key={post.id} className="group">
                  <Link href={`/posts/${post.slug}?lang=${locale}`}>
                    {post.featured_image_url && (
                      <div className="aspect-video bg-gray-100 mb-4 overflow-hidden rounded-sm">
                        <img
                          src={post.featured_image_url}
                          alt={translation?.title || ''}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {translation?.title}
                    </h3>
                    {translation?.excerpt && (
                      <p className="text-sm text-gray-500 line-clamp-3 mb-3">{translation.excerpt}</p>
                    )}
                    <span className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                      {t.read_more} →
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href={`/posts?lang=${locale}`}
            className="inline-block border border-gray-900 text-gray-900 text-sm px-8 py-3 hover:bg-gray-900 hover:text-white transition-colors"
          >
            {t.all_posts}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-gray-400">
          <span>{isAr ? 'جميع الحقوق محفوظة © 2025' : '© 2025 All rights reserved'}</span>
          <span>{isAr ? 'بني باستخدام Next.js + Supabase' : 'Built with Next.js + Supabase'}</span>
        </div>
      </footer>
    </div>
  );
}
