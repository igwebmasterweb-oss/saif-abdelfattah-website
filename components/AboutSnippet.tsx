import Link from 'next/link';
import { NAV, normLocale } from '@/lib/i18n';
import { PROFILE } from '@/lib/profile';

export default function AboutSnippet({ locale }: { locale: string }) {
  const loc = normLocale(locale);
  const t = NAV[loc];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-[minmax(0,1fr)_1.4fr] gap-10 md:gap-14 items-center">
        {/* الصورة */}
        <div className="relative mx-auto md:mx-0 w-56 md:w-full max-w-xs">
          <div className="absolute -inset-3 rounded-2xl border border-gold-300/40 -z-10" />
          <div className="absolute -bottom-3 -end-3 w-full h-full rounded-2xl bg-navy-700/10 -z-20" />
          <img
            src="/images/dr/dr1.png"
            alt={PROFILE.fullName}
            className="w-full aspect-[4/5] object-cover object-top rounded-2xl shadow-lg"
          />
        </div>

        {/* النص */}
        <div>
          <p className="kicker mb-3">{t.aboutTitle}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy leading-tight mb-4">
            {PROFILE.fullName}
          </h2>
          <div className="flex items-center gap-3 text-gold-500 mb-5">
            <span className="h-px w-10 bg-gold-400" />
            <span className="text-sm">◆</span>
          </div>
          <p className="text-ink-soft leading-loose text-lg mb-3">{PROFILE.role}</p>
          <p className="text-ink-muted leading-relaxed mb-6">{PROFILE.specialty}</p>
          <p className="text-ink-muted text-sm mb-8">
            <span className="text-navy font-medium">{loc === 'ar' ? 'المولد:' : 'Born:'}</span>{' '}
            {PROFILE.birth}
          </p>
          <Link href={`/about?lang=${loc}`} className="btn-outline">
            {t.aboutMore} ←
          </Link>
        </div>
      </div>
    </section>
  );
}
