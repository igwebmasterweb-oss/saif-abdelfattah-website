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
    .select(`id, slug, published_at, featured_image_url,
      post_translations!inner(title, excerpt, locale)`)
    .eq('status', 'published')
    .eq('post_translations.locale', locale)
    .order('published_at', { ascending: false })
    .limit(6);
  return data || [];
}

interface Props { searchParams: Promise<{ lang?: string }>; }

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const locale = params.lang === 'en' ? 'en' : 'ar';
  const isAr = locale === 'ar';
  const posts = await getLatestPosts(locale);

  const t = {
    hero_title:   isAr ? 'أ.د. سيف الدين عبد الفتاح' : 'Prof. Saif Al-Din Abd Al-Fattah',
    hero_sub:     isAr ? 'المدرسة الحضارية' : 'The Civilizational School',
    hero_desc:    isAr ? 'فكر سياسي إسلامي • بحث أكاديمي • حوار حضاري' : 'Islamic Political Thought • Academic Research • Civilizational Dialogue',
    latest:       isAr ? 'جديد الموقع' : 'Latest Articles',
    read_more:    isAr ? 'اقرأ المزيد' : 'Read more',
    all_posts:    isAr ? 'جميع المقالات' : 'All Articles',
    nav_about:    isAr ? 'عن المؤلف'  : 'About',
    nav_posts:    isAr ? 'المقالات'     : 'Articles',
    nav_books:    isAr ? 'الكتب'       : 'Books',
    nav_contact:  isAr ? 'تواصل'       : 'Contact',
    lang_switch:  isAr ? 'English'  : 'عربي',
    lang_href:    isAr ? '/?lang=en' : '/',
    no_posts:     isAr ? 'لا توجد مقالات بعد.' : 'No articles yet.',
    stat_articles:isAr ? 'مقال' : 'Articles',
    stat_books:   isAr ? 'كتاب' : 'Books',
    stat_studies: isAr ? 'دراسة' : 'Studies',
    footer_rights:isAr ? 'جميع الحقوق محفوظة © 2025' : '© 2025 All rights reserved',
    footer_built: isAr ? 'بني بـ Next.js + Supabase' : 'Built with Next.js + Supabase',
  };

  const dir = isAr ? 'rtl' : 'ltr';

  return (
    <div dir={dir} lang={locale} className="min-h-screen bg-white">

      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white border-b border-warm-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo text */}
          <Link href={`/?lang=${locale}`}
            className="text-navy text-lg font-bold tracking-tight hover:text-navy-700 transition-colors">
            {isAr ? 'سيف عبد الفتاح' : 'Saif Abd Al-Fattah'}
          </Link>
          {/* Nav links */}
          <div className="flex items-center gap-1">
            {[
              { label: t.nav_about,   href: `/about?lang=${locale}` },
              { label: t.nav_posts,   href: `/posts?lang=${locale}` },
              { label: t.nav_books,   href: `/books?lang=${locale}` },
              { label: t.nav_contact, href: `/contact?lang=${locale}` },
            ].map(({ label, href }) => (
              <Link key={label} href={href}
                className="px-3 py-2 text-sm text-gray-600 hover:text-navy rounded transition-colors">
                {label}
              </Link>
            ))}
            <Link href={t.lang_href}
              className="mr-2 ml-2 text-xs border border-navy-300 text-navy-600 rounded px-3 py-1.5 hover:bg-navy hover:text-white transition-colors">
              {t.lang_switch}
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4 leading-tight">
            {t.hero_title}
          </h1>
          {/* Orange accent line */}
          <div className="flex justify-center mb-5">
            <span className="block w-12 h-1 rounded-full bg-brand" />
          </div>
          <p className="text-xl text-gray-500 font-light mb-3">{t.hero_sub}</p>
          <p className="text-base text-gray-400">{t.hero_desc}</p>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="bg-navy py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { num: '500+', label: t.stat_articles },
              { num: '36',   label: t.stat_studies },
              { num: '5',    label: t.stat_books },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="text-3xl font-bold text-white mb-1">{num}</div>
                <div className="text-sm text-navy-200">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST POSTS ===== */}
      <section className="bg-warm-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section heading with orange underline */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-2">{t.latest}</h2>
            <div className="w-10 h-0.5 bg-brand" />
          </div>

          {posts.length === 0 ? (
            <p className="text-gray-400 py-12 text-center">{t.no_posts}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any) => {
                const tr = Array.isArray(post.post_translations)
                  ? post.post_translations[0]
                  : post.post_translations;
                return (
                  <article key={post.id}
                    className="bg-white border border-warm-200 rounded hover:shadow-md transition-shadow group">
                    <Link href={`/posts/${post.slug}?lang=${locale}`}>
                      {post.featured_image_url ? (
                        <div className="aspect-video overflow-hidden rounded-t">
                          <img
                            src={post.featured_image_url}
                            alt={tr?.title || ''}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-navy-50 rounded-t flex items-center justify-center">
                          <span className="text-navy-200 text-3xl">★</span>
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="text-sm font-semibold text-navy mb-2 line-clamp-2 group-hover:text-brand transition-colors">
                          {tr?.title}
                        </h3>
                        {tr?.excerpt && (
                          <p className="text-xs text-gray-500 line-clamp-3 mb-4">{tr.excerpt}</p>
                        )}
                        <span className="text-xs font-medium text-brand">
                          {t.read_more} ←
                        </span>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link href={`/posts?lang=${locale}`}
              className="btn-primary">
              {t.all_posts}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-navy-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-lg font-bold text-white mb-1">
                {isAr ? 'أ.د. سيف الدين عبد الفتاح' : 'Prof. Saif Abd Al-Fattah'}
              </p>
              <p className="text-sm text-navy-300">
                {isAr ? 'المدرسة الحضارية' : 'The Civilizational School'}
              </p>
            </div>
            <div className="flex gap-5 text-sm text-navy-300">
              <Link href={`/about?lang=${locale}`} className="hover:text-white transition-colors">{t.nav_about}</Link>
              <Link href={`/posts?lang=${locale}`} className="hover:text-white transition-colors">{t.nav_posts}</Link>
              <Link href={`/contact?lang=${locale}`} className="hover:text-white transition-colors">{t.nav_contact}</Link>
            </div>
          </div>
          <div className="border-t border-navy-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-navy-400 gap-2">
            <span>{t.footer_rights}</span>
            <span>{t.footer_built}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
