import Link from 'next/link';
import { normLocale } from '@/lib/i18n';
import { WAQF_INTRO } from '@/lib/quotes';

export default function WaqfIntro({ locale }: { locale: string }) {
  const loc = normLocale(locale);
  const isAr = loc === 'ar';

  return (
    <section className="bg-paper-50 border-b border-paper-300">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-[minmax(0,0.9fr)_1.4fr] gap-10 md:gap-14 items-center">
          {/* اللوجو */}
          <div className="mx-auto w-full max-w-xs">
            <div className="relative bg-white rounded-2xl border border-paper-300 shadow-sm p-8 md:p-10">
              <div className="absolute -inset-2 rounded-2xl border border-gold-300/40 -z-10" />
              <img
                src="/images/waqf-logo.jpg"
                alt={isAr ? 'شعار مشروع وقف القلم' : 'The Pen Endowment logo'}
                className="w-full h-auto object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* النبذة */}
          <div className={isAr ? 'text-right' : 'text-left'}>
            <p className="kicker mb-3">{isAr ? 'المشروع العلمي' : 'The Project'}</p>
            <p className="font-display text-2xl md:text-3xl text-gold-500 leading-relaxed mb-3">
              {WAQF_INTRO.motto}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy leading-tight mb-5">
              {WAQF_INTRO.slogan}
            </h2>
            <div className="flex items-center gap-3 text-gold-500 mb-6">
              <span className="h-px w-12 bg-gold-400" />
              <span className="text-sm">◆</span>
            </div>
            <p className="text-ink-soft leading-loose text-lg mb-8">{WAQF_INTRO.desc}</p>
            <Link href={`/posts?lang=${loc}`} className="btn-primary">
              {isAr ? 'تصفّح الأعمال' : 'Browse the works'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
