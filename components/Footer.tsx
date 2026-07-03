import Link from 'next/link';
import { NAV, SITE, SOCIAL, normLocale } from '@/lib/i18n';

function SocialIcon({ name }: { name: string }) {
  if (name === 'Facebook') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.25 10.44 22v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22C18.34 21.25 22 17.08 22 12.06Z" />
      </svg>
    );
  }
  // X / Twitter
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l4.98 6.6L18.9 2Zm-1.23 18h1.7L7.4 3.9H5.6l12.07 16.1Z" />
    </svg>
  );
}

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
            <p className="text-navy-200 text-sm leading-relaxed max-w-xs mb-5">{site.tagline}</p>
            <p className="text-gold-300 text-xs font-medium tracking-widest uppercase mb-3">{t.follow}</p>
            <div className="flex items-center gap-3">
              {SOCIAL.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full border border-white/20 text-navy-100 flex items-center justify-center hover:bg-gold-400 hover:text-navy hover:border-gold-400 transition-colors">
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
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
