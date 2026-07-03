'use client';
import { useEffect, useState, useCallback } from 'react';
import { QUOTES } from '@/lib/quotes';
import { PROFILE } from '@/lib/profile';

export default function QuotesCarousel({ locale }: { locale: string }) {
  const isAr = locale !== 'en';
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = QUOTES.length;

  const go = useCallback((next: number) => setI((next + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 7000);
    return () => clearInterval(t);
  }, [paused, n]);

  const q = QUOTES[i];

  return (
    <section
      className="relative overflow-hidden bg-navy-900 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* زخرفة خلفية */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 25%, #c9a95a 0, transparent 42%), radial-gradient(circle at 85% 78%, #c04f17 0, transparent 46%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <p className="kicker text-gold-300 justify-center mb-2">
            {isAr ? 'من فكر الدكتور' : 'In his own words'}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            {isAr ? 'مقولاتٌ ومقاماتٌ فكرية' : 'Selected quotes'}
          </h2>
          <div className="ornament ornament--light mt-4"><span>◆</span></div>
        </div>

        <div className="grid md:grid-cols-[minmax(0,0.85fr)_1.6fr] gap-8 md:gap-12 items-center">
          {/* صورة الدكتور */}
          <div className="relative mx-auto w-52 md:w-full max-w-[19rem]">
            <div className="absolute -inset-3 rounded-2xl border border-gold-300/40" />
            <img
              src="/images/dr/dr-tashkeel.jpg"
              alt={PROFILE.fullName}
              className="relative w-full aspect-square object-cover object-top rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </div>

          {/* المقولة */}
          <div className="min-h-[15rem] md:min-h-[16rem] flex flex-col justify-center">
            <span className="font-display text-6xl md:text-7xl text-gold-400/40 leading-none mb-2">
              ”
            </span>
            <div key={i} className="quote-fade">
              <p className="font-display text-xl md:text-2xl leading-relaxed text-navy-50 mb-5">
                {q.text}
              </p>
              <p className="text-gold-300 text-sm tracking-wide">— {q.topic}</p>
            </div>

            {/* أدوات التنقل */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => go(i - 1)}
                aria-label={isAr ? 'السابق' : 'Previous'}
                className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-white hover:text-navy transition-colors"
              >
                {isAr ? '›' : '‹'}
              </button>
              <div className="flex gap-1.5">
                {QUOTES.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => go(k)}
                    aria-label={`${k + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      k === i ? 'w-6 bg-gold-300' : 'w-1.5 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(i + 1)}
                aria-label={isAr ? 'التالي' : 'Next'}
                className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-white hover:text-navy transition-colors"
              >
                {isAr ? '‹' : '›'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
