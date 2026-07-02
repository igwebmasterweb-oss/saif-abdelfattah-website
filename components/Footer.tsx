import Link from 'next/link';

interface FooterProps {
  locale?: string;
}

export default function Footer({ locale = 'ar' }: FooterProps) {
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const t = {
    tagline: isAr ? 'المدرسة الحضارية' : 'The Civilizational School',
    desc: isAr
      ? 'موقع الأستاذ الدكتور سيف الدين عبد الفتاح — فكر سياسي إسلامي ، بحث أكاديمي ، حوار حضاري.'
      : 'The official site of Prof. Saif Al-Din Abd Al-Fattah — Islamic political thought, academic research, civilizational dialogue.',
    nav_title: isAr ? 'تصفح' : 'Navigate',
    connect_title: isAr ? 'تواصل' : 'Connect',
    rights: isAr ? 'جميع الحقوق محفوظة © 2025' : '© 2025 All rights reserved',
    built: isAr ? 'مبني بـ Next.js + Supabase' : 'Built with Next.js + Supabase',
    about: isAr ? 'عن المؤلف' : 'About',
    posts: isAr ? 'المقالات' : 'Articles',
    books: isAr ? 'الكتب' : 'Books',
    studies: isAr ? 'الدراسات' : 'Studies',
    videos: isAr ? 'فيديوهات' : 'Videos',
    contact: isAr ? 'تواصل معنا' : 'Contact Us',
    works: isAr ? 'الأعمال الكاملة' : 'Complete Works',
  };

  const footerLinks = [
    { label: t.about, href: `/about?lang=${locale}` },
    { label: t.posts, href: `/posts?lang=${locale}` },
    { label: t.books, href: `/books?lang=${locale}` },
    { label: t.studies, href: `/studies?lang=${locale}` },
    { label: t.videos, href: `/videos?lang=${locale}` },
    { label: t.contact, href: `/contact?lang=${locale}` },
    { label: t.works, href: `/works?lang=${locale}` },
  ];

  return (
    <footer dir={dir} className="bg-[#142847] text-white">
      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1 h-6 bg-[#e8601c] rounded-full" />
              <span className="text-lg font-bold text-white">
                {isAr ? 'أ.د. سيف عبد الفتاح' : 'Prof. Saif Abd Al-Fattah'}
              </span>
            </div>
            <p className="text-sm text-[#9fb2d1] leading-relaxed mb-6">
              {t.desc}
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                {
                  href: 'https://twitter.com/saifabdelfattah',
                  label: 'Twitter/X',
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                    </svg>
                  ),
                },
                {
                  href: 'https://www.youtube.com/@saifabdelfattah',
                  label: 'YouTube',
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                },
                {
                  href: 'https://www.facebook.com/saifabdelfattah',
                  label: 'Facebook',
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1e3a5f] text-[#9fb2d1] hover:bg-[#e8601c] hover:text-white transition-all"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="text-xs font-semibold text-[#e8601c] uppercase tracking-widest mb-5">
              {t.nav_title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9fb2d1] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / connect */}
          <div>
            <h3 className="text-xs font-semibold text-[#e8601c] uppercase tracking-widest mb-5">
              {t.connect_title}
            </h3>
            <p className="text-sm text-[#9fb2d1] mb-4">
              {isAr
                ? 'اشترك لتصلك آخر المقالات والدراسات.'
                : 'Subscribe to receive the latest articles and studies.'}
            </p>
            <form
              action="/api/subscribe"
              method="POST"
              className="flex gap-2"
            >
              <input
                type="email"
                name="email"
                required
                dir="ltr"
                placeholder={isAr ? 'بريدك الإلكتروني' : 'Your email'}
                className="flex-1 bg-[#1e3a5f] border border-[#2d5491] rounded px-3 py-2 text-sm text-white placeholder-[#6b7fa3] focus:outline-none focus:border-[#e8601c] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#e8601c] text-white text-sm font-medium px-4 py-2 rounded hover:bg-[#c4511a] transition-colors shrink-0"
              >
                {isAr ? 'اشترك' : 'Subscribe'}
              </button>
            </form>
            {/* Quick contact */}
            <div className="mt-6 space-y-2">
              <a
                href="https://www.saifabdelfattah.net/contact-us"
                className="flex items-center gap-2 text-sm text-[#9fb2d1] hover:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {isAr ? 'راسلنا' : 'Send a message'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1e3a5f]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#6b7fa3]">
          <span>{t.rights}</span>
          <span>{t.built}</span>
        </div>
      </div>
    </footer>
  );
}
