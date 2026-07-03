import { NAV, normLocale } from '@/lib/i18n';
import { BOOKS } from '@/lib/books';

export default function BookGallery({ locale }: { locale: string }) {
  const loc = normLocale(locale);
  const t = NAV[loc];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <p className="kicker justify-center mb-2">{t.booksKicker}</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">{t.booksTitle}</h2>
        <p className="text-ink-muted mt-3 max-w-xl mx-auto">{t.booksNote}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
        {BOOKS.map((b, i) => (
          <figure
            key={i}
            className="group relative"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-paper-200 shadow-md transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
              <img
                src={b.src}
                alt={b.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-lg" />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
