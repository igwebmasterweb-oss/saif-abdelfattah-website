'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { NAV, SITE, normLocale } from '@/lib/i18n';
import { ARTICLE_MENU, CATS, catHref } from '@/lib/menu';
import SearchOverlay from '@/components/SearchOverlay';

export default function Navbar({ locale = 'ar' }: { locale?: string }) {
  const [open, setOpen] = useState(false);          // قائمة الجوال
  const [drop, setDrop] = useState(false);           // قائمة المقالات المنسدلة (سطح المكتب)
  const [mArticles, setMArticles] = useState(false); // مجموعة المقالات في الجوال
  const loc = normLocale(locale);
  const isAr = loc === 'ar';
  const t = NAV[loc];
  const site = SITE[loc];
  const pathname = usePathname() || '/';
  const params = useSearchParams();

  const otherLoc = isAr ? 'en' : 'ar';
  const sp = new URLSearchParams(params?.toString());
  sp.set('lang', otherLoc);
  const langHref = `${pathname}?${sp.toString()}`;

  // الروابط العلوية المستقلة (أقسام لها محتوى فعلي)
  const topLinks = [
    { label: t.bio, href: `/about?lang=${loc}` },
    { label: t.waqf, href: `/?lang=${loc}#waqf` },
    { label: t.studies, href: catHref(loc, CATS.studies) },
    { label: t.books, href: catHref(loc, CATS.books) },
    { label: t.podcast, href: catHref(loc, CATS.podcast) },
    { label: t.highlights, href: catHref(loc, CATS.highlights) },
    { label: t.contact, href: `/contact?lang=${loc}` },
  ];

  return (
    <nav dir={isAr ? 'rtl' : 'ltr'} className="sticky top-0 z-50 bg-paper-50/90 backdrop-blur-md border-b border-paper-300">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="h-16 flex items-center justify-between gap-2">
          {/* الشعار */}
          <Link href={`/?lang=${loc}`} className="flex items-center group flex-shrink-0" aria-label={site.name}>
            <img
              src="/images/logo-org.png"
              alt={site.name}
              className="h-9 md:h-11 w-auto object-contain mix-blend-multiply transition-opacity group-hover:opacity-80"
            />
          </Link>

          {/* روابط سطح المكتب */}
          <div className="hidden lg:flex items-center gap-0.5">
            {/* المقالات — قائمة منسدلة */}
            <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
              <Link
                href={`/posts?lang=${loc}`}
                className="flex items-center gap-1 px-3 py-2 text-sm text-ink-soft hover:text-navy hover:bg-paper-100 rounded transition-colors"
              >
                {t.posts}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${drop ? 'rotate-180' : ''}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </Link>
              {drop && (
                <div className={`absolute top-full ${isAr ? 'end-0' : 'start-0'} pt-2 w-60`}>
                  <div className="bg-white rounded-xl shadow-xl border border-paper-200 py-2 overflow-hidden">
                    <Link href={`/posts?lang=${loc}`}
                      className="block px-4 py-2 text-sm font-semibold text-navy hover:bg-paper-100 transition-colors">
                      {t.allCategories}
                    </Link>
                    <div className="my-1 border-t border-paper-200" />
                    {ARTICLE_MENU.map((c) => (
                      <Link key={c.id} href={catHref(loc, c.id)}
                        className="block px-4 py-2 text-sm text-ink-soft hover:bg-paper-100 hover:text-brand transition-colors">
                        {c.label[loc]}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {topLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className="px-3 py-2 text-sm text-ink-soft hover:text-navy hover:bg-paper-100 rounded transition-colors whitespace-nowrap">
                {l.label}
              </Link>
            ))}
          </div>

          {/* الأدوات: بحث + لغة (سطح المكتب) */}
          <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
            <SearchOverlay locale={loc} />
            <a href={langHref}
              className="ms-1 text-xs font-medium border border-navy/30 text-navy rounded-full px-3.5 py-1.5 hover:bg-navy hover:text-white transition-colors">
              {t.lang}
            </a>
          </div>

          {/* الجوال */}
          <div className="flex lg:hidden items-center gap-1 flex-shrink-0">
            <SearchOverlay locale={loc} />
            <a href={langHref}
              className="text-xs font-medium border border-navy/30 text-navy rounded-full px-3 py-1 hover:bg-navy hover:text-white transition-colors">
              {t.lang}
            </a>
            <button onClick={() => setOpen(!open)} className="p-2 rounded text-navy hover:bg-paper-100 transition-colors" aria-label="menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
              </svg>
            </button>
          </div>
        </div>

        {/* قائمة الجوال */}
        {open && (
          <div className="lg:hidden border-t border-paper-300 py-2 max-h-[70vh] overflow-y-auto">
            {/* المقالات كمجموعة قابلة للطي */}
            <button
              onClick={() => setMArticles(!mArticles)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-navy hover:bg-paper-100 rounded transition-colors"
            >
              {t.posts}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${mArticles ? 'rotate-180' : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {mArticles && (
              <div className={`${isAr ? 'pe-4 border-e-2' : 'ps-4 border-s-2'} border-paper-300 ms-4 my-1 space-y-0.5`}>
                <Link href={`/posts?lang=${loc}`} onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm text-ink-soft hover:text-brand hover:bg-paper-100 rounded transition-colors">
                  {t.allCategories}
                </Link>
                {ARTICLE_MENU.map((c) => (
                  <Link key={c.id} href={catHref(loc, c.id)} onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm text-ink-soft hover:text-brand hover:bg-paper-100 rounded transition-colors">
                    {c.label[loc]}
                  </Link>
                ))}
              </div>
            )}
            <div className="my-1 border-t border-paper-200" />
            {topLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-ink-soft hover:text-navy hover:bg-paper-100 rounded transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
