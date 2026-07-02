import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { normLocale } from '@/lib/i18n';

export const revalidate = 3600;

const T = {
  ar: {
    kicker: 'تواصل معنا',
    title: 'تواصل',
    subtitle: 'يسعدني التواصل معكم للنقاش الفكري والتعاون الأكاديمي.',
    emailLabel: 'البريد الإلكتروني',
    email: 'contact@saifabdelfattah.net',
    socialLabel: 'حسابات التواصل',
    note: 'يمكنك مراسلتي مباشرة عبر البريد الإلكتروني للاستفسار أو التعاون البحثي.',
  },
  en: {
    kicker: 'Get in touch',
    title: 'Contact',
    subtitle: 'Happy to connect for intellectual discussion and academic collaboration.',
    emailLabel: 'Email',
    email: 'contact@saifabdelfattah.net',
    socialLabel: 'Social accounts',
    note: 'You can reach me directly via email for inquiries or research collaboration.',
  },
} as const;

const SOCIALS = [
  { name: 'X / Twitter', href: 'https://twitter.com/saifabdelfattah' },
  { name: 'Facebook', href: 'https://facebook.com/saifabdelfattah' },
  { name: 'YouTube', href: 'https://youtube.com/@saifabdelfattah' },
];

interface Props { searchParams: Promise<{ lang?: string }>; }

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const loc = normLocale(sp.lang);
  const isAr = loc === 'ar';
  const tr = T[loc];

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-paper-50">
      <Suspense fallback={<div className="h-16 border-b border-paper-300" />}>
        <Navbar locale={loc} />
      </Suspense>

      <main className="flex-1">
        <header className="bg-white border-b border-paper-300">
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 md:py-16">
            <p className="kicker">{tr.kicker}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-navy mt-3">{tr.title}</h1>
            <p className="text-ink-soft mt-4 text-lg leading-relaxed">{tr.subtitle}</p>
          </div>
        </header>

        <section className="max-w-3xl mx-auto px-4 md:px-6 py-14 space-y-6">
          <div className="card p-8">
            <p className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-3">{tr.emailLabel}</p>
            <a href={`mailto:${tr.email}`} className="font-display text-2xl font-bold text-navy hover:text-brand transition-colors">
              {tr.email}
            </a>
          </div>

          <div className="card p-8">
            <p className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-5">{tr.socialLabel}</p>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="chip bg-white border-paper-300 text-navy hover:border-brand hover:text-brand px-4 py-2">
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <p className="text-sm text-ink-muted leading-relaxed">{tr.note}</p>
        </section>
      </main>

      <Footer locale={loc} />
    </div>
  );
}
