'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { NAV, SITE, normLocale } from '@/lib/i18n';

export default function Navbar({ locale = 'ar' }: { locale?: string }) {
  const [open, setOpen] = useState(false);
  const loc = normLocale(locale);
  const isAr = loc === 'ar';
  const t = NAV[loc];
  const site = SITE[loc];
  const pathname = usePathname() || '/';
  const params = useSearchParams();

  // رابط تبديل اللغة يحافظ على المسار الحالي
  const otherLoc = isAr ? 'en' : 'ar';
  const sp = new URLSearchParams(params?.toString());
  sp.set('lang', otherLoc);
  const langHref = `${pathname}?${sp.toString()}`;

  const links = [
    { label: t.posts, href: `/posts?lang=${loc}` },
    { label: t.about, href: `/about?lang=${loc}` },
    { label: t.contact, href: `/contact?lang=${loc}` },
  ];

  return (
    <nav dir={isAr ? 'rtl' : 'ltr'} className="sticky top-0 z-50 bg-paper-50/90 backdrop-blur-md border-b border-paper-300">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* الشعار: لوجو الموقع القديم بالخط العربي */}
          <Link href={`/?lang=${loc}`} className="flex items-center group" aria-label={site.name}>
            <img
              src="/images/logo-org.png"
              alt={site.name}
              className="h-9 md:h-11 w-auto object-contain mix-blend-multiply transition-opacity group-hover:opacity-80"
            />
          </Link>

          {/* روابط سطح المكتب */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                className="px-3.5 py-2 text-sm text-ink-soft hover:text-navy hover:bg-paper-100 rounded transition-colors">
                {l.label}
              </Link>
            ))}
            <a href={langHref}
              className="ms-2 text-xs font-medium border border-navy/30 text-navy rounded-full px-3.5 py-1.5 hover:bg-navy hover:text-white transition-colors">
              {t.lang}
            </a>
          </div>

          {/* الجوال */}
          <div className="flex md:hidden items-center gap-2">
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

        {open && (
          <div className="md:hidden border-t border-paper-300 py-3 space-y-0.5">
            {links.map((l) => (
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
