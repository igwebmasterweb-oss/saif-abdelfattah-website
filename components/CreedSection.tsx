import { NAV, normLocale } from '@/lib/i18n';
import { CREED } from '@/lib/profile';

export default function CreedSection({ locale }: { locale: string }) {
  const loc = normLocale(locale);
  const t = NAV[loc];

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {/* زخرفة خلفية */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, #c9a95a 0, transparent 40%), radial-gradient(circle at 85% 80%, #c04f17 0, transparent 45%)',
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
        <p className="kicker text-gold-300 justify-center mb-4">{t.creedKicker}</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
          {CREED.title}
        </h2>
        <div className="ornament ornament--light mb-8"><span className="text-lg">◆</span></div>

        <blockquote className="font-display text-2xl md:text-3xl leading-relaxed text-navy-50 mb-8">
          {CREED.short}
        </blockquote>

        <p className="text-navy-100/90 leading-loose mb-3">{CREED.pen}</p>
        <p className="text-navy-100/70 leading-relaxed text-sm max-w-2xl mx-auto mb-10">
          {CREED.waqf}
        </p>

        <div className="flex flex-col items-center gap-1">
          <span className="h-px w-16 bg-gold-400/60 mb-3" />
          <p className="font-display text-gold-200 text-lg">{CREED.signature}</p>
          <p className="text-navy-100/60 text-sm">{CREED.date}</p>
        </div>
      </div>
    </section>
  );
}
