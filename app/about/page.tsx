import Link from 'next/link';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE, NAV, normLocale } from '@/lib/i18n';
import {
  BIO_DATA, DEGREES, CAREER, ABROAD, ACTIVITIES, COURSES,
  CONFERENCES, SEMINARS, THESES, PUBLICATIONS,
} from '@/lib/about';

export const revalidate = 3600;

interface Props { searchParams: Promise<{ lang?: string }>; }

// عنوان قسم بزخرفة
function SectionHead({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mb-8">
      {kicker && <p className="kicker">{kicker}</p>}
      <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mt-2">{title}</h2>
      <div className="ornament mt-4" />
    </div>
  );
}

export default async function AboutPage({ searchParams }: Props) {
  const sp = await searchParams;
  const loc = normLocale(sp.lang);
  const isAr = loc === 'ar';
  const t = NAV[loc];
  const site = SITE[loc];

  const bioData = BIO_DATA[loc];
  const degrees = DEGREES[loc];
  const career = CAREER[loc];
  const abroad = ABROAD[loc];
  const activities = ACTIVITIES[loc];
  const courses = COURSES[loc];
  const conferences = CONFERENCES[loc];
  const seminars = SEMINARS[loc];
  const theses = THESES[loc];
  const pubs = PUBLICATIONS[loc];

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-paper-50">
      <Suspense fallback={<div className="h-16 border-b border-paper-300" />}>
        <Navbar locale={loc} />
      </Suspense>

      <main className="flex-1">
        {/* HERO مع صورة */}
        <section className="relative bg-navy-900 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle at 15% 25%, #b08d3e 0, transparent 42%), radial-gradient(circle at 85% 75%, #c04f17 0, transparent 42%)' }} />
          <div className="relative max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-gold-400/40 to-brand/30 blur-sm" />
                  <img
                    src="/images/dr/dr-seif.png"
                    alt={site.fullName}
                    className="relative w-40 h-40 md:w-52 md:h-52 rounded-full object-cover object-top ring-4 ring-white/10 shadow-2xl"
                  />
                </div>
              </div>
              <div className={`text-center ${isAr ? 'md:text-right' : 'md:text-left'}`}>
                <p className="text-gold-300 text-xs font-medium tracking-[0.25em] uppercase mb-3">{t.bio}</p>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">{site.fullName}</h1>
                <p className="text-navy-100 mt-4 leading-relaxed max-w-xl">{t.aboutIntro}</p>
                <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                  <Link href={`/posts?lang=${loc}`} className="btn-primary">{t.exploreAll}</Link>
                  <Link href={`/?lang=${loc}#waqf`} className="btn-outline !text-white !border-white/40 hover:!bg-white/10">{t.waqf}</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 md:px-6 py-14 md:py-20 space-y-16 md:space-y-20">

          {/* البيانات الأساسية */}
          <section>
            <SectionHead title={t.secData} />
            <div className="card overflow-hidden p-0">
              <dl className="divide-y divide-paper-200">
                {bioData.map((row) => (
                  <div key={row.k} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-5 py-4 hover:bg-paper-50 transition-colors">
                    <dt className="text-sm font-semibold text-brand sm:col-span-1">{row.k}</dt>
                    <dd className="text-ink-soft sm:col-span-2 leading-relaxed">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* الدرجات العلمية */}
          <section>
            <SectionHead title={t.secDegrees} />
            <div className="grid gap-5">
              {degrees.map((d) => (
                <div key={d.title} className="card p-6 border-s-4 border-s-gold-400">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <h3 className="font-display text-xl font-bold text-navy">{d.title}</h3>
                    <span className="chip bg-navy-50 border-navy-100 text-navy text-xs">{d.date}</span>
                  </div>
                  <p className="text-sm text-ink-muted mb-2">{d.place}</p>
                  <p className="text-sm text-ink-soft"><span className="font-semibold text-brand">{t.grade}:</span> {d.grade}</p>
                  {d.subject && <p className="text-sm text-ink-soft mt-2"><span className="font-semibold text-brand">{t.subject}:</span> {d.subject}</p>}
                  {d.advisor && <p className="text-sm text-ink-muted mt-2 italic">{d.advisor}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* التدرج الوظيفي — خط زمني */}
          <section>
            <SectionHead title={t.secCareer} />
            <ol className="relative border-s-2 border-paper-300 ms-3 space-y-6">
              {career.map((c) => (
                <li key={c.role} className="ms-6">
                  <span className="absolute -start-[9px] mt-1.5 w-4 h-4 rounded-full bg-gold-400 ring-4 ring-paper-50" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-ink-soft font-medium leading-relaxed">{c.role}</p>
                    <span className="text-sm text-brand font-semibold whitespace-nowrap">{c.period}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* الدراسة والبحث بالخارج + المقررات — عمودان */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12">
            <section>
              <SectionHead title={t.secAbroad} />
              <ul className="space-y-4">
                {abroad.map((a) => (
                  <li key={a} className="flex gap-3 text-ink-soft leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <SectionHead title={t.secCourses} />
              <div className="flex flex-wrap gap-2.5">
                {courses.map((c) => (
                  <span key={c} className="chip bg-white border-paper-300 text-navy">{c}</span>
                ))}
              </div>
            </section>
          </div>

          {/* الأنشطة والعضويات */}
          <section>
            <SectionHead title={t.secActivities} />
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {activities.map((a) => (
                <li key={a} className="flex gap-3 text-ink-soft leading-relaxed">
                  <svg className="mt-1 w-4 h-4 text-gold-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z" clipRule="evenodd" />
                  </svg>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* المؤتمرات والندوات — عمودان */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12">
            <section>
              <SectionHead title={t.secConferences} />
              <ul className="space-y-3">
                {conferences.map((c) => (
                  <li key={c} className="text-sm text-ink-soft leading-relaxed ps-4 border-s-2 border-paper-300 hover:border-brand transition-colors">{c}</li>
                ))}
              </ul>
            </section>
            <section>
              <SectionHead title={t.secSeminars} />
              <ul className="space-y-3">
                {seminars.map((s) => (
                  <li key={s} className="text-sm text-ink-soft leading-relaxed ps-4 border-s-2 border-paper-300 hover:border-brand transition-colors">{s}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* الرسائل المُشرَف عليها */}
          <section>
            <SectionHead title={t.secTheses} />
            <div className="grid sm:grid-cols-2 gap-4">
              {theses.map((th, i) => (
                <div key={th} className="card p-4 flex gap-3 items-start">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-sm text-ink-soft leading-relaxed">{th}</p>
                </div>
              ))}
            </div>
          </section>

          {/* المؤلفات */}
          <section>
            <SectionHead kicker={t.booksKicker} title={t.secPublications} />
            <div className="grid sm:grid-cols-2 gap-5">
              {pubs.map((b) => (
                <div key={b.title} className="card p-5 group hover:-translate-y-0.5 transition-transform">
                  <div className="flex gap-4">
                    <svg className="flex-shrink-0 w-8 h-8 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    </svg>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy leading-snug group-hover:text-brand transition-colors">{b.title}</h3>
                      <p className="text-sm text-ink-muted mt-1.5 leading-relaxed">{b.meta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA ختامي */}
          <section className="text-center pt-4">
            <div className="ornament mx-auto mb-6" />
            <p className="text-ink-soft mb-6 leading-relaxed max-w-lg mx-auto">{t.aboutIntro}</p>
            <Link href={`/posts?lang=${loc}`} className="btn-primary">{t.exploreAll}</Link>
          </section>
        </div>
      </main>

      <Footer locale={loc} />
    </div>
  );
}
