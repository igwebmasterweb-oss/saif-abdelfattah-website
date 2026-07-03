import { NAV, normLocale } from '@/lib/i18n';
import { MILESTONES } from '@/lib/profile';

export default function Milestones({ locale }: { locale: string }) {
  const loc = normLocale(locale);
  const t = NAV[loc];

  return (
    <section className="bg-paper-50">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="kicker justify-center mb-2">{t.milestonesKicker}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            {t.milestonesTitle}
          </h2>
          <div className="ornament mt-4"><span>◆</span></div>
        </div>

        <ol className="relative border-s-2 border-gold-300/50 ms-3 md:ms-6 space-y-9">
          {MILESTONES.map((m, i) => (
            <li key={i} className="relative ps-8 md:ps-10">
              <span className="absolute -start-[9px] top-1.5 w-4 h-4 rounded-full bg-brand ring-4 ring-paper-50" />
              <div className="font-display text-gold-500 text-lg font-bold mb-1">{m.year}</div>
              <h3 className="font-display text-xl font-bold text-navy leading-snug mb-1">
                {m.title}
              </h3>
              {m.detail && <p className="text-ink-muted text-sm leading-relaxed">{m.detail}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
