import Link from 'next/link';

const t = {
  ar: {
    title: 'عن الكاتب',
    name: 'أ.د. سيف الدين عبد الفتاح',
    school: 'المدرسة الحضارية',
    bio: 'أستاذ متخصص في العلوم السياسية، ومفكر إسلامي معاصر يكتب في الفكر الحضاري والسياسي والاجتماعي. صدر له عدد من الكتب والدراسات، ويسعى إلى تأصيل خطاب حضاري معاصر يجمع بين الأصالة والمعاصرة.',
    expertise: 'تخصصاته',
    areas: ['الفكر السياسي الإسلامي', 'الفكر الحضاري', 'علم السياسة المقارن', 'الاجتماع السياسي'],
    stats: [{ num: '500+', label: 'مقالة' }, { num: '36', label: 'دراسة علمية' }, { num: '5', label: 'كتب' }],
    read_posts: 'اطلع على المقالات',
    lang_switch: 'English',
    lang_href: '/about?lang=en',
    nav_about: 'عن الكاتب',
    nav_posts: 'المقالات',
    nav_books: 'الكتب',
    nav_contact: 'تواصل',
  },
  en: {
    title: 'About the Author',
    name: 'Prof. Saif Al-Din Abd Al-Fattah',
    school: 'The Civilizational School',
    bio: 'A professor of political science and contemporary Islamic thinker writing on civilizational, political, and social thought. Author of numerous books and studies, he seeks to establish a contemporary civilizational discourse that combines authenticity and modernity.',
    expertise: 'Areas of Expertise',
    areas: ['Islamic Political Thought', 'Civilizational Thought', 'Comparative Political Science', 'Political Sociology'],
    stats: [{ num: '500+', label: 'Articles' }, { num: '36', label: 'Academic Studies' }, { num: '5', label: 'Books' }],
    read_posts: 'Browse Articles',
    lang_switch: 'عربي',
    lang_href: '/about?lang=ar',
    nav_about: 'About',
    nav_posts: 'Articles',
    nav_books: 'Books',
    nav_contact: 'Contact',
  },
} as const;

type Locale = keyof typeof t;

interface Props { searchParams: Promise<{ lang?: string }>; }

export default async function AboutPage({ searchParams }: Props) {
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

      {/* HERO */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">{tr.name}</h1>
          <div className="flex justify-center mb-4">
            <span className="block w-10 h-1 rounded-full bg-brand" />
          </div>
          <p className="text-navy-200 text-lg">{tr.school}</p>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {tr.stats.map(({ num, label }) => (
              <div key={label}>
                <div className="text-3xl font-bold text-white mb-1">{num}</div>
                <div className="text-sm text-white/80">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="bg-warm-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-xl font-bold text-navy mb-2">{tr.title}</h2>
          <div className="w-8 h-0.5 bg-brand mb-6" />
          <p className="text-gray-600 leading-relaxed text-base mb-10">{tr.bio}</p>

          <h3 className="text-lg font-semibold text-navy mb-4">{tr.expertise}</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {tr.areas.map((area) => (
              <li key={area} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-2 h-2 rounded-full bg-brand flex-shrink-0" />
                {area}
              </li>
            ))}
          </ul>

          <Link href={`/posts?lang=${locale}`} className="btn-primary">
            {tr.read_posts}
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-bold">{tr.name}</p>
            <div className="flex gap-5 text-sm text-navy-300">
              <Link href={`/posts?lang=${locale}`} className="hover:text-white">{tr.nav_posts}</Link>
              <Link href={`/contact?lang=${locale}`} className="hover:text-white">{tr.nav_contact}</Link>
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
