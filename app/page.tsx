import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import HeroSection from '@/components/HeroSection';
import StatBar from '@/components/StatBar';
import QuotesCarousel from '@/components/QuotesCarousel';
import WaqfIntro from '@/components/WaqfIntro';
import Milestones from '@/components/Milestones';
import BookGallery from '@/components/BookGallery';
import CentersStrip from '@/components/CentersStrip';
import CreedSection from '@/components/CreedSection';
import { getLatestPosts, getCategories } from '@/lib/queries';
import { NAV, normLocale } from '@/lib/i18n';

export const revalidate = 3600;

interface Props { searchParams: Promise<{ lang?: string }>; }

export default async function HomePage({ searchParams }: Props) {
  const { lang } = await searchParams;
  const loc = normLocale(lang);
  const isAr = loc === 'ar';
  const t = NAV[loc];

  const [posts, cats] = await Promise.all([
    getLatestPosts(loc, 7),
    getCategories(loc),
  ]);

  const totalArticles = cats.reduce((sum, c) => sum + (c.count || 0), 0) || 1007;

  const feature = posts[0];
  const rest = posts.slice(1, 7);
  const topCats = cats.slice(0, 12);

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} lang={loc} className="min-h-screen bg-paper-50">
      <Navbar locale={loc} />

      {/* ===== HERO ===== */}
      <HeroSection locale={loc} />

      {/* ===== STATS ===== */}
      <StatBar locale={loc} articles={totalArticles} />

      {/* ===== WAQF INTRO (logo + about project) — تحت الهيرو مباشرة بدل قسم عن الكاتب ===== */}
      <WaqfIntro locale={loc} />

      {/* ===== QUOTES CAROUSEL ===== */}
      <QuotesCarousel locale={loc} />

      {/* ===== FEATURE + LATEST ===== */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
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
        </div>
      </section>

      {/* ===== MILESTONES ===== */}
      <Milestones locale={loc} />

      {/* ===== CATEGORIES (expanded) ===== */}
      {topCats.length > 0 && (
        <section className="bg-paper-100 border-y border-paper-300 max-w-full">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="mb-8 text-center">
            <p className="kicker justify-center mb-2">{t.categories}</p>
            <h2 className="font-display text-3xl font-bold text-navy">{t.browseTopic}</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {topCats.map((c) => (
              <Link key={c.id} href={`/posts?lang=${loc}&cat=${c.id}`}
                className="chip bg-white border-paper-300 text-navy hover:border-brand hover:text-brand py-2 px-4 text-sm">
                {c.name}
                <span className="ms-2 text-ink-faint">{c.count}</span>
              </Link>
            ))}
          </div>
          </div>
        </section>
      )}

      {/* ===== BOOKS GALLERY ===== */}
      <BookGallery locale={loc} />

      {/* ===== CENTERS ===== */}
      <CentersStrip locale={loc} />

      {/* ===== CREED / وقف القلم ===== */}
      <CreedSection locale={loc} />

      <Footer locale={loc} />
    </div>
  );
}
