import { NAV, normLocale } from '@/lib/i18n';

export default function StatBar({ locale, articles }: { locale: string; articles: number }) {
  const loc = normLocale(locale);
  const t = NAV[loc];

  const stats = [
    { value: '+45', label: t.yearsLabel },
    { value: articles.toLocaleString(loc === 'ar' ? 'ar-EG' : 'en-US'), label: t.articlesLabel },
    { value: '+9', label: t.booksLabel },
    { value: '8', label: t.centersLabel },
  ];

  return (
    <section className="bg-navy-800 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-9 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-display text-3xl md:text-4xl font-bold text-gold-200 mb-1">
              {s.value}
            </div>
            <div className="text-xs md:text-sm text-navy-100/80 tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
