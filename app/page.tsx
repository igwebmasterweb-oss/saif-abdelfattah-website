import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { getLatestPosts, getCategories } from '@/lib/queries';
import { NAV, SITE, normLocale } from '@/lib/i18n';

export const revalidate = 3600;

interface Props { searchParams: Promise<{ lang?: string }>; }

export default async function HomePage({ searchParams }: Props) {
  const { lang } = await searchParams;
  const loc = normLocale(lang);
  const isAr = loc === 'ar';
  const t = NAV[loc];
  const site = SITE[loc];

  const [posts, cats] = await Promise.all([
    getLatestPosts(loc, 9),
    getCategories(loc),
  ]);

  const feature = posts[0];
  const rest = posts.slice(1, 7);
  const topCats = cats.slice(0, 8);

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} lang={loc} className="min-h-screen bg-paper-50">
      <Navbar locale={loc} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #c9a95a 0, transparent 40%), radial-gradient(circle at 80% 70%, #c04f17 0, transparent 45%)',
        }} />
        <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="kicker text-gold-300 justify-center mb-5">
            {isAr ? 'الموقع الرسمي' : 'Official Website'}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
            {site.fullName}
          </h1>
          <div className="ornament mb-6"><span className="text-lg">◆</span></div>
          <p className="text-lg md:text-xl text-navy-100 font-light max-w-2xl mx-auto leading-relaxed">
            {site.tagline}
          </p>
          <div className="mt-9 flex items-center justify-center gap-3">
            <Link href={`/posts?lang=${loc}`} className="btn-primary">{t.exploreAll}</Link>
            <Link href={`/about?lang=${loc}`}
              className="inline-flex items-center gap-2 border border-white/25 text-white text-sm font-medium px-6 py-3 rounded hover:bg-white hover:text-navy transition-all">
              {t.about}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURE + LATEST ===== */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="mb-10">
          <p className="kicker mb-2">{t.latest}</p>
          <h2 className="font-display text-3xl font-bold text-navy">{t.posts}</h2>
        </div>

        {posts.length === 0 ? (
          <p className="text-ink-muted py-16 text-center">{isAr ? 'لا توجد مقالات بعد.' : 'No articles yet.'}</p>
        ) : (
          <>
            {feature && <div className="mb-10"><PostCard post={feature} locale={loc} variant="feature" /></div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p) => <PostCard key={p.id} post={p} locale={loc} variant="grid" />)}
            </div>
          </>
        )}

        <div className="mt-12 text-center">
          <Link href={`/posts?lang=${loc}`} className="btn-outline">{t.exploreAll} ←</Link>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      {topCats.length > 0 && (
        <section className="bg-paper-100 border-y border-paper-300">
          <div className="max-w-6xl mx-auto px-6 py-14">
            <div className="mb-8">
              <p className="kicker mb-2">{t.categories}</p>
              <h2 className="font-display text-2xl font-bold text-navy">{isAr ? 'تصفّح حسب الموضوع' : 'Browse by topic'}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {topCats.map((c) => (
                <Link key={c.id} href={`/posts?lang=${loc}&cat=${c.id}`}
                  className="chip bg-white border-paper-300 text-navy hover:border-brand hover:text-brand">
                  {c.name}
                  <span className="ms-2 text-ink-faint">{c.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer locale={loc} />
    </div>
  );
}
