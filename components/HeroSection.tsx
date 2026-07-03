import Link from 'next/link';
import { NAV, normLocale } from '@/lib/i18n';
import { PROFILE } from '@/lib/profile';

export default function HeroSection({ locale }: { locale: string }) {
  const loc = normLocale(locale);
  const isAr = loc === 'ar';
  const t = NAV[loc];

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      {/* صورة الخلفية الأكاديمية */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-study.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-900/80 to-navy-900" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 25%, #c9a95a 0, transparent 42%), radial-gradient(circle at 82% 75%, #c04f17 0, transparent 45%)',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-[1.5fr_minmax(0,1fr)] gap-12 items-center">
          {/* النص */}
          <div className={isAr ? 'text-right' : 'text-left'}>
            <p className="kicker text-gold-300 mb-5">
              {isAr ? 'الموقع الرسمي' : 'Official Website'}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
              {PROFILE.fullName}
            </h1>
            <div className="flex items-center gap-3 text-gold-300 mb-6">
              <span className="h-px w-14 bg-gold-400/70" />
              <span>◆</span>
            </div>
            <p className="text-lg md:text-xl text-navy-50 font-light leading-relaxed mb-3">
              {PROFILE.role}
            </p>
            <p className="text-navy-100/80 leading-relaxed mb-9">{PROFILE.specialty}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/posts?lang=${loc}`} className="btn-primary">
                {t.exploreAll}
              </Link>
              <Link
                href={`/about?lang=${loc}`}
                className="inline-flex items-center gap-2 border border-white/25 text-white text-sm font-medium px-6 py-3 rounded hover:bg-white hover:text-navy transition-all"
              >
                {t.about}
              </Link>
            </div>
          </div>

          {/* صورة البروفايل */}
          <div className="relative mx-auto w-56 md:w-full max-w-[18rem]">
            <div className="absolute -inset-3 rounded-2xl border border-gold-300/40" />
            <img
              src="/images/dr/dr-seif.png"
              alt={PROFILE.fullName}
              className="relative w-full aspect-[4/5] object-cover object-top rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
