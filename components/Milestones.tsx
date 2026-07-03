import { NAV, normLocale } from '@/lib/i18n';
import { MILESTONES } from '@/lib/profile';

export default function Milestones({ locale }: { locale: string }) {
  const loc = normLocale(locale);
  const t = NAV[loc];

  return (
    <section className="bg-navy-900 text-white relative overflow-hidden">
      {/* زخرفة خلفية */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 20%, #c9a95a 0, transparent 40%), radial-gradient(circle at 88% 85%, #c04f17 0, transparent 44%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="kicker text-gold-300 justify-center mb-2">{t.milestonesKicker}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            {t.milestonesTitle}
          </h2>
          <div className="ornament ornament--light mt-4"><span>◆</span></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              className="group relative rounded-xl bg-white/[0.04] border border-white/10 p-5 transition-all hover:bg-white/[0.07] hover:border-gold-400/50"
            >
              <span className="inline-block font-display text-lg font-extrabold text-navy bg-gold-300 rounded-md px-3 py-0.5 mb-3">
                {m.year}
              </span>
              <h3 className="font-display text-lg font-bold text-white leading-snug mb-1.5">
                {m.title}
              </h3>
              {m.detail && (
                <p className="text-navy-100/70 text-sm leading-relaxed">{m.detail}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
