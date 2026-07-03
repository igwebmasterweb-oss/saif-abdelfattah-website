import { NAV, normLocale } from '@/lib/i18n';
import { CENTER_LOGOS } from '@/lib/books';

export default function CentersStrip({ locale }: { locale: string }) {
  const loc = normLocale(locale);
  const t = NAV[loc];

  return (
    <section className="bg-paper-100 border-y border-paper-300">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="kicker justify-center mb-2">{t.centersKicker}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">{t.centersTitle}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {CENTER_LOGOS.map((c, i) => (
            <div
              key={i}
              title={c.name}
              className="group bg-white rounded-lg border border-paper-300 p-6 flex items-center justify-center h-32 transition-all duration-300 hover:border-gold-300 hover:shadow-md"
            >
              <img
                src={c.src}
                alt={c.name}
                loading="lazy"
                className="max-h-16 max-w-[80%] object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
