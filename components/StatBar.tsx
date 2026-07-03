import { NAV, normLocale } from '@/lib/i18n';

export default function StatBar({ locale, articles }: { locale: string; articles: number }) {
  const loc = normLocale(locale);
  const t = NAV[loc];

  // أرقام إنجليزية موحّدة دائمًا
  const stats = [
    { value: '45+', label: t.yearsLabel },
    { value: articles.toLocaleString('en-US'), label: t.articlesLabel },
    { value: '9+', label: t.booksLabel },
    { value: '8', label: t.centersLabel },
  ];

  return (
    <section className="relative overflow-hidden bg-paper-100 border-y border-paper-300">
      {/* زخرفة خفيفة */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 40%, #c04f17 0, transparent 40%), radial-gradient(circle at 85% 60%, #c9a95a 0, transparent 42%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group relative rounded-2xl bg-white border border-paper-300 shadow-sm px-4 py-6 md:py-8 text-center transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-gold-400"
            >
              {/* شريط علوي متدرّج */}
              <span className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              <div
                className="font-display text-4xl md:text-5xl font-extrabold leading-none mb-2 bg-gradient-to-b from-brand to-navy bg-clip-text text-transparent"
                style={{ direction: 'ltr' }}
              >
                {s.value}
              </div>
              <div className="text-xs md:text-sm font-medium text-ink-soft tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
