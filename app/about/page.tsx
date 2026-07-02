import Link from 'next/link';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE, normLocale } from '@/lib/i18n';

export const revalidate = 3600;

const T = {
  ar: {
    kicker: 'المدرسة الحضارية',
    title: 'عن الكاتب',
    bio: 'أستاذ متخصص في العلوم السياسية، ومفكر إسلامي معاصر يكتب في الفكر الحضاري والسياسي والاجتماعي. صدر له عدد من الكتب والدراسات، ويسعى إلى تأصيل خطاب حضاري معاصر يجمع بين الأصالة والمعاصرة.',
    expertise: 'مجالات التخصص',
    areas: ['الفكر السياسي الإسلامي', 'الفكر الحضاري', 'علم السياسة المقارن', 'الاجتماع السياسي'],
    stats: [{ num: '١٠٠٠+', label: 'مقالة' }, { num: '٣٦', label: 'دراسة علمية' }, { num: '٥', label: 'كتب' }],
    readPosts: 'اطلع على المقالات',
  },
  en: {
    kicker: 'The Civilizational School',
    title: 'About the Author',
    bio: 'A professor of political science and contemporary Islamic thinker writing on civilizational, political, and social thought. Author of numerous books and studies, he seeks to establish a contemporary civilizational discourse that combines authenticity and modernity.',
    expertise: 'Areas of Expertise',
    areas: ['Islamic Political Thought', 'Civilizational Thought', 'Comparative Political Science', 'Political Sociology'],
    stats: [{ num: '1000+', label: 'Articles' }, { num: '36', label: 'Studies' }, { num: '5', label: 'Books' }],
    readPosts: 'Browse Articles',
  },
} as const;

interface Props { searchParams: Promise<{ lang?: string }>; }

export default async function AboutPage({ searchParams }: Props) {
  const sp = await searchParams;
  const loc = normLocale(sp.lang);
  const isAr = loc === 'ar';
  const tr = T[loc];
  const site = SITE[loc];

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-paper-50">
      <Suspense fallback={<div className="h-16 border-b border-paper-300" />}>
        <Navbar locale={loc} />
      </Suspense>

      <main className="flex-1">
        {/* HERO */}
        <section className="relative bg-navy-900 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #b08d3e 0, transparent 40%), radial-gradient(circle at 80% 70%, #c04f17 0, transparent 40%)' }} />
          <div className="relative max-w-4xl mx-auto px-4 md:px-6 py-20 md:py-28 text-center">
            <p className="text-gold-300 text-xs font-medium tracking-[0.25em] uppercase mb-4">{tr.kicker}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white">{site.fullName}</h1>
            <div className="ornament ornament--light mt-6 mx-auto" />
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white border-b border-paper-300">
          <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 gap-4 text-center">
            {tr.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl md:text-4xl font-bold text-brand mb-1">{s.num}</div>
                <div className="text-sm text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* BIO */}
        <section className="max-w-prose mx-auto px-4 md:px-6 py-16">
          <p className="kicker">{tr.title}</p>
          <div className="ornament mt-3 mb-8" />
          <p className="text-lg text-ink-soft leading-loose mb-12">{tr.bio}</p>

          <h2 className="font-display text-2xl font-bold text-navy mb-6">{tr.expertise}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {tr.areas.map((a) => (
              <li key={a} className="flex items-center gap-3 text-ink-soft">
                <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                {a}
              </li>
            ))}
          </ul>

          <Link href={`/posts?lang=${loc}`} className="btn-primary">{tr.readPosts}</Link>
        </section>
      </main>

      <Footer locale={loc} />
    </div>
  );
}
