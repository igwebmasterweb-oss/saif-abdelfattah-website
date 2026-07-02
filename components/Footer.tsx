import Link from 'next/link';
import { NAV, SITE, normLocale } from '@/lib/i18n';

export default function Footer({ locale = 'ar' }: { locale?: string }) {
  const loc = normLocale(locale);
  const isAr = loc === 'ar';
  const t = NAV[loc];
  const site = SITE[loc];
  const year = new Date().getFullYear();

  return (
    <footer dir={isAr ? 'rtl' : 'ltr'} className="bg-navy-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-2xl font-bold mb-3">{site.fullName}</p>
            <p className="text-navy-200 text-sm leading-relaxed max-w-xs">{site.tagline}</p>
          </div>
          <div>
            <p className="text-gold-300 text-xs font-medium tracking-widest uppercase mb-4">{t.categories}</p>
            <ul className="space-y-2.5 text-sm text-navy-200">
              <li><Link href={`/posts?lang=${loc}`} className="hover:text-white transition-colors">{t.posts}</Link></li>
              <li><Link href={`/about?lang=${loc}`} className="hover:text-white transition-colors">{t.about}</Link></li>
              <li><Link href={`/contact?lang=${loc}`} className="hover:text-white transition-colors">{t.contact}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-gold-300 text-xs font-medium tracking-widest uppercase mb-4">{t.contact}</p>
            <p className="text-navy-200 text-sm leading-relaxed">
              {isAr ? 'للتواصل والاستفسارات الأكاديمية والإعلامية.' : 'For academic and media inquiries.'}
            </p>
            <Link href={`/contact?lang=${loc}`}
              className="inline-block mt-3 text-sm text-gold-300 hover:text-white transition-colors border-b border-gold-500/40 pb-0.5">
              {t.contact} ←
            </Link>
          </div>
        </div>
        <div className="border-t border-navy-700 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-navy-300">
          <p>© {year} {site.fullName}. {t.rights}.</p>
          <p className="font-display text-gold-400">◆</p>
        </div>
      </div>
    </footer>
  );
}
