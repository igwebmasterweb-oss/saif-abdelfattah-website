'use client';
import { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  locale?: string;
}

export default function Navbar({ locale = 'ar' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const t = {
    logo: isAr ? 'سيف عبد الفتاح' : 'Saif Abd Al-Fattah',
    about: isAr ? 'عن المؤلف' : 'About',
    posts: isAr ? 'المقالات' : 'Articles',
    books: isAr ? 'الكتب' : 'Books',
    studies: isAr ? 'الدراسات' : 'Studies',
    videos: isAr ? 'فيديوهات' : 'Videos',
    contact: isAr ? 'تواصل' : 'Contact',
    lang: isAr ? 'English' : 'عربي',
    langHref: isAr ? '?lang=en' : '?lang=ar',
  };

  const navLinks = [
    { label: t.about, href: `/about?lang=${locale}` },
    { label: t.posts, href: `/posts?lang=${locale}` },
    { label: t.books, href: `/books?lang=${locale}` },
    { label: t.studies, href: `/studies?lang=${locale}` },
    { label: t.videos, href: `/videos?lang=${locale}` },
    { label: t.contact, href: `/contact?lang=${locale}` },
  ];

  return (
    <nav
      dir={dir}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e8e6e3] shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/?lang=${locale}`}
            className="flex items-center gap-2 group"
          >
            <span className="w-1 h-7 bg-[#e8601c] rounded-full" />
            <span className="text-base md:text-lg font-bold text-[#1e3a5f] group-hover:text-[#e8601c] transition-colors">
              {t.logo}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-[#4a4a4a] hover:text-[#1e3a5f] hover:bg-[#f5f4f2] rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {/* Language toggle */}
            <a
              href={t.langHref}
              className="mx-2 text-xs font-medium border border-[#1e3a5f] text-[#1e3a5f] rounded-full px-3 py-1 hover:bg-[#1e3a5f] hover:text-white transition-colors"
            >
              {t.lang}
            </a>
          </div>

          {/* Mobile: lang + burger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={t.langHref}
              className="text-xs font-medium border border-[#1e3a5f] text-[#1e3a5f] rounded-full px-2.5 py-1 hover:bg-[#1e3a5f] hover:text-white transition-colors"
            >
              {t.lang}
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded text-[#1e3a5f] hover:bg-[#f5f4f2] transition-colors"
              aria-label="قائمة التنقل"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#e8e6e3] py-3 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-sm text-[#4a4a4a] hover:text-[#1e3a5f] hover:bg-[#f5f4f2] rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
