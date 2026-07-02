import Link from 'next/link';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import PostFilters from '@/components/PostFilters';
import { getPostsPage, getCategories } from '@/lib/queries';
import { NAV, SITE, normLocale } from '@/lib/i18n';

export const revalidate = 600;

const PER_PAGE = 12;

interface Props {
  searchParams: Promise<{ lang?: string; cat?: string; q?: string; page?: string }>;
}

export default async function PostsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const loc = normLocale(sp.lang);
  const isAr = loc === 'ar';
  const t = NAV[loc];
  const site = SITE[loc];

  const categoryId = sp.cat || null;
  const q = sp.q || null;
  const page = Math.max(1, parseInt(sp.page || '1', 10) || 1);

  const [{ posts, total }, cats] = await Promise.all([
    getPostsPage({ locale: loc, page, perPage: PER_PAGE, categoryId, q }),
    getCategories(loc),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const activeCat = cats.find((c) => c.id === categoryId);

  // بناء رابط صفحة مع الحفاظ على الفلاتر
  const pageHref = (p: number) => {
    const u = new URLSearchParams();
    u.set('lang', loc);
    if (categoryId) u.set('cat', categoryId);
    if (q) u.set('q', q);
    if (p > 1) u.set('page', String(p));
    return `/posts?${u.toString()}`;
  };

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-paper-50">
      <Suspense fallback={<div className="h-16 border-b border-paper-300" />}>
        <Navbar locale={loc} />
      </Suspense>

      <main className="flex-1">
        {/* ترويسة الصفحة */}
        <header className="bg-white border-b border-paper-300">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
            <p className="kicker">{site.tagline}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy mt-3">
              {activeCat ? activeCat.name : t.posts}
            </h1>
            <p className="text-ink-muted mt-3 text-sm">
              {total.toLocaleString(isAr ? 'ar-EG' : 'en-US')} {t.articlesCount}
              {q ? ` — «${q}»` : ''}
            </p>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
          {/* الفلاتر */}
          <Suspense fallback={<div className="h-20" />}>
            <PostFilters
              locale={loc}
              categories={cats}
              activeCat={categoryId}
              activeQ={q}
            />
          </Suspense>

          {/* الشبكة */}
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-navy mb-2">{t.noResults}</p>
              <Link href={`/posts?lang=${loc}`} className="text-sm text-brand hover:text-brand-700">
                {t.allCategories} ←
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} locale={loc} variant="grid" />
              ))}
            </div>
          )}

          {/* الترقيم */}
          {totalPages > 1 && (
            <nav className="mt-14 flex items-center justify-center gap-3" aria-label="pagination">
              {page > 1 ? (
                <Link href={pageHref(page - 1)} className="btn-outline text-sm">
                  {isAr ? '→' : '←'} {t.prev}
                </Link>
              ) : (
                <span className="btn-outline text-sm opacity-40 pointer-events-none">
                  {isAr ? '→' : '←'} {t.prev}
                </span>
              )}

              <span className="text-sm text-ink-muted px-2">
                {t.page} {page.toLocaleString(isAr ? 'ar-EG' : 'en-US')} {t.of}{' '}
                {totalPages.toLocaleString(isAr ? 'ar-EG' : 'en-US')}
              </span>

              {page < totalPages ? (
                <Link href={pageHref(page + 1)} className="btn-outline text-sm">
                  {t.next} {isAr ? '←' : '→'}
                </Link>
              ) : (
                <span className="btn-outline text-sm opacity-40 pointer-events-none">
                  {t.next} {isAr ? '←' : '→'}
                </span>
              )}
            </nav>
          )}
        </div>
      </main>

      <Footer locale={loc} />
    </div>
  );
}
