import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getPost(slug: string, locale: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );
    const enc = (s: string) => encodeURIComponent(s).replace(/%[0-9A-F]{2}/g, (m) => m.toLowerCase());
  const candidates = Array.from(new Set([
    slug,
    encodeURIComponent(slug),
    slug.split('-').map(enc).join('-'),
    decodeURIComponent(slug),
        slug.normalize('NFC').split('-').map(enc).join('-'),
    slug.normalize('NFD').split('-').map(enc).join('-'),
    (() => { try { return decodeURIComponent(slug).split('-').map(enc).join('-'); } catch { return slug; } })(),
  ]));
  const { data } = await supabase
    .from('posts')
    .select(`id, slug, published_at, featured_image_url,
      post_translations!inner(title, excerpt, content, locale)`)
            .in('slug', candidates)
    .eq('status', 'published')
    .eq('post_translations.locale', locale)
            .limit(1)
        .maybeSingle();
  return data;
}

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function PostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const locale = sp.lang === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const post = await getPost(slug, locale);
  if (!post) notFound();

  const tr = Array.isArray(post.post_translations)
    ? post.post_translations[0]
    : post.post_translations;

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString(
        locale === 'ar' ? 'ar-EG' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
      )
    : '';

  const navT = {
    ar: { about: 'عن الكاتب', posts: 'المقالات', books: 'الكتب', contact: 'تواصل', back: '→ العودة للمقالات', lang_switch: 'English', lang_href: `/posts/${slug}?lang=en` },
    en: { about: 'About', posts: 'Articles', books: 'Books', contact: 'Contact', back: '← Back to articles', lang_switch: 'عربي', lang_href: `/posts/${slug}?lang=ar` },
  }[locale];

  return (
    <div dir={dir} lang={locale} className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b border-warm-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/?lang=${locale}`} className="text-navy text-lg font-bold tracking-tight">
            {isAr ? 'سيف عبد الفتاح' : 'Saif Abd Al-Fattah'}
          </Link>
          <div className="flex items-center gap-1">
            {[
              { label: navT.about, href: `/about?lang=${locale}` },
              { label: navT.posts, href: `/posts?lang=${locale}` },
              { label: navT.books, href: `/books?lang=${locale}` },
              { label: navT.contact, href: `/contact?lang=${locale}` },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="px-3 py-2 text-sm text-gray-600 hover:text-navy rounded transition-colors">{label}</Link>
            ))}
            <Link href={navT.lang_href} className="ml-2 text-xs border border-navy-300 text-navy-600 rounded px-3 py-1.5 hover:bg-navy hover:text-white transition-colors">
              {navT.lang_switch}
            </Link>
          </div>
        </div>
      </nav>

      {/* ARTICLE */}
      <main className="max-w-3xl mx-auto px-6 py-14">
        {/* Back link */}
        <Link href={`/posts?lang=${locale}`} className="text-sm text-brand hover:underline mb-8 inline-block">
          {navT.back}
        </Link>

        {/* Featured image */}
        {post.featured_image_url && (
          <div className="aspect-video overflow-hidden rounded mb-8">
            <img src={post.featured_image_url} alt={tr?.title || ''}
              className="w-full h-full object-cover" />
          </div>
        )}

        {/* Meta */}
        {date && <p className="text-xs text-gray-400 mb-3">{date}</p>}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3 leading-snug">
          {tr?.title}
        </h1>
        <div className="w-10 h-1 rounded-full bg-brand mb-6" />

        {/* Excerpt */}
        {tr?.excerpt && (
          <p className="text-lg text-gray-500 font-light mb-8 leading-relaxed">{tr.excerpt}</p>
        )}

        {/* Content */}
        {tr?.content && (
          <div
            className="prose prose-navy max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: tr.content }}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-navy-900 text-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-bold">{isAr ? 'أ.د. سيف الدين عبد الفتاح' : 'Prof. Saif Abd Al-Fattah'}</p>
            <div className="flex gap-5 text-sm text-navy-300">
              <Link href={`/posts?lang=${locale}`} className="hover:text-white">{navT.posts}</Link>
              <Link href={`/about?lang=${locale}`} className="hover:text-white">{navT.about}</Link>
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
