import Link from 'next/link';

const books = [
  {
    id: 1,
    title_ar: 'فقه التدين والدولة',
    title_en: 'The Jurisprudence of Religion and the State',
    year: '2010',
    desc_ar: 'دراسة تأصيلية في فقه السياسة الشرعية وعلاقة الدين بالدولة',
    desc_en: 'A foundational study in Islamic political jurisprudence and the relationship between religion and the state',
  },
  {
    id: 2,
    title_ar: 'معالم المشروع الحضاري',
    title_en: 'Features of the Civilizational Project',
    year: '2014',
    desc_ar: 'ملامح مشروع حضاري إسلامي معاصر يجمع بين الأصالة والتجديد',
    desc_en: 'An outline of a contemporary Islamic civilizational project combining authenticity and renewal',
  },
  {
    id: 3,
    title_ar: 'الدولة المدنية في الفكر السياسي الإسلامي',
    title_en: 'The Civil State in Islamic Political Thought',
    year: '2017',
    desc_ar: 'تحليل مفهوم الدولة المدنية في السياق الإسلامي المعاصر',
    desc_en: 'Analysis of the concept of civil state in contemporary Islamic context',
  },
  {
    id: 4,
    title_ar: 'السياسة والحوكمة في الإسلام',
    title_en: 'Politics and Governance in Islam',
    year: '2019',
    desc_ar: 'مراجعة نقدية لمفاهيم الحوكمة والسياسة من منظور حضاري',
    desc_en: 'Critical review of governance and politics concepts from a civilizational perspective',
  },
  {
    id: 5,
    title_ar: 'مشكلة الأفكار في العالم الإسلامي',
    title_en: 'The Problem of Ideas in the Islamic World',
    year: '2022',
    desc_ar: 'تشخيص أزمة الفكر والحضارة في العالم الإسلامي المعاصر',
    desc_en: 'Diagnosis of the intellectual and civilizational crisis in the contemporary Islamic world',
  },
];

const t = {
  ar: { title: 'الكتب', subtitle: 'مؤلفات أ.د. سيف الدين عبد الفتاح', lang_switch: 'English', lang_href: '/books?lang=en', nav_about: 'عن الكاتب', nav_posts: 'المقالات', nav_books: 'الكتب', nav_contact: 'تواصل' },
  en: { title: 'Books', subtitle: 'Publications by Prof. Saif Abd Al-Fattah', lang_switch: 'عربي', lang_href: '/books?lang=ar', nav_about: 'About', nav_posts: 'Articles', nav_books: 'Books', nav_contact: 'Contact' },
} as const;

type Locale = keyof typeof t;
interface Props { searchParams: Promise<{ lang?: string }>; }

export default async function BooksPage({ searchParams }: Props) {
  const sp = await searchParams;
  const locale: Locale = sp.lang === 'ar' ? 'ar' : 'en';
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const tr = t[locale];

  return (
    <div dir={dir} lang={locale} className="min-h-screen bg-white">
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
            <Link href={tr.lang_href} className="ml-2 text-xs border border-navy-300 text-navy-600 rounded px-3 py-1.5 hover:bg-navy hover:text-white transition-colors">{tr.lang_switch}</Link>
          </div>
        </div>
      </nav>

      <section className="bg-white py-14 border-b border-warm-200">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">{tr.title}</h1>
          <div className="w-10 h-1 rounded-full bg-brand mb-4" />
          <p className="text-gray-500">{tr.subtitle}</p>
        </div>
      </section>

      <section className="bg-warm-50 py-14">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white border border-warm-200 rounded p-6 flex gap-5 hover:shadow-sm transition-shadow">
                <div className="w-12 h-16 bg-navy rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg font-bold">{book.year.slice(2)}</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">{book.year}</p>
                  <h2 className="text-base font-semibold text-navy mb-2">
                    {isAr ? book.title_ar : book.title_en}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isAr ? book.desc_ar : book.desc_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
