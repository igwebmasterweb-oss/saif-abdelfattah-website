import Link from 'next/link';

const t = {
  ar: {
    title: 'تواصل',
    subtitle: 'يسعدني التواصل معكم للنقاش الفكري والتعاون الأكاديمي',
    email_label: 'البريد الإلكتروني',
    email: 'contact@saifabdelfattah.net',
    social_label: 'التواصل الاجتماعي',
    note: 'ملاحظة: يمكنك مراسلتي مباشرة عبر البريد الإلكتروني للاستفسار أو التعاون البحثي.',
    lang_switch: 'English',
    lang_href: '/contact?lang=en',
    nav_about: 'عن الكاتب',
    nav_posts: 'المقالات',
    nav_books: 'الكتب',
    nav_contact: 'تواصل',
  },
  en: {
    title: 'Contact',
    subtitle: 'Happy to connect for intellectual discussion and academic collaboration',
    email_label: 'Email',
    email: 'contact@saifabdelfattah.net',
    social_label: 'Social Media',
    note: 'Note: You can reach me directly via email for inquiries or research collaboration.',
    lang_switch: 'عربي',
    lang_href: '/contact?lang=ar',
    nav_about: 'About',
    nav_posts: 'Articles',
    nav_books: 'Books',
    nav_contact: 'Contact',
  },
} as const;

type Locale = keyof typeof t;

interface Props { searchParams: Promise<{ lang?: string }>; }

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const locale: Locale = sp.lang === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const tr = t[locale];

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
              { label: tr.nav_about, href: `/about?lang=${locale}` },
              { label: tr.nav_posts, href: `/posts?lang=${locale}` },
              { label: tr.nav_books, href: `/books?lang=${locale}` },
              { label: tr.nav_contact, href: `/contact?lang=${locale}` },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="px-3 py-2 text-sm text-gray-600 hover:text-navy rounded transition-colors">{label}</Link>
            ))}
            <Link href={tr.lang_href} className="ml-2 text-xs border border-navy-300 text-navy-600 rounded px-3 py-1.5 hover:bg-navy hover:text-white transition-colors">
              {tr.lang_switch}
            </Link>
          </div>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="bg-white py-14 border-b border-warm-200">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">{tr.title}</h1>
          <div className="w-10 h-1 rounded-full bg-brand mb-4" />
          <p className="text-gray-500">{tr.subtitle}</p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="bg-warm-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border border-warm-200 rounded p-8 mb-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">{tr.email_label}</h2>
            <a href={`mailto:${tr.email}`}
              className="text-xl font-medium text-navy hover:text-brand transition-colors">
              {tr.email}
            </a>
          </div>

          <div className="bg-white border border-warm-200 rounded p-8 mb-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">{tr.social_label}</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'X / Twitter', href: 'https://twitter.com/saifabdelfattah' },
                { name: 'Facebook', href: 'https://facebook.com/saifabdelfattah' },
                { name: 'YouTube', href: 'https://youtube.com/@saifabdelfattah' },
              ].map(({ name, href }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 border border-navy-300 text-navy-700 text-sm rounded hover:bg-navy hover:text-white transition-colors">
                  {name}
                </a>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">{tr.note}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-bold">{isAr ? 'أ.د. سيف الدين عبد الفتاح' : 'Prof. Saif Abd Al-Fattah'}</p>
            <div className="flex gap-5 text-sm text-navy-300">
              <Link href={`/posts?lang=${locale}`} className="hover:text-white">{tr.nav_posts}</Link>
              <Link href={`/about?lang=${locale}`} className="hover:text-white">{tr.nav_about}</Link>
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
