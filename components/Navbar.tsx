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
          {/* الشعار */}
          <Link href={`/?lang=${loc}`} className="flex items-center gap-2.5 group">
            <Logo />
            <span className="font-display text-lg md:text-xl font-bold text-navy group-hover:text-brand transition-colors">
              {site.name}
            </span>
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

/** شعار: قلم/محبرة مُجرّد داخل إطار — يرمز للكتابة والفكر */
function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-label="logo" className="text-brand">
      <rect x="2.5" y="2.5" width="35" height="35" rx="8" stroke="currentColor" strokeWidth="2" />
      <path d="M13 27L27 13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 10.5L29.5 16L27 13Z" fill="currentColor" />
      <circle cx="13.5" cy="26.5" r="2.2" fill="#1b2e49" />
    </svg>
  );
}
