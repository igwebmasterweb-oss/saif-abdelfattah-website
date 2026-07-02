import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'أ.د. سيف الدين عبد الفتاح | المدرسة الحضارية',
    template: '%s | أ.د. سيف عبد الفتاح',
  },
  description: 'الموقع الرسمي للأستاذ الدكتور سيف الدين عبد الفتاح — مقالات، كتب، فيديوهات، ودراسات في الفكر الحضاري الإسلامي.',
  metadataBase: new URL('https://www.saifabdelfattah.net'),
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    alternateLocale: 'en_US',
    siteName: 'أ.د. سيف الدين عبد الفتاح',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Arabic: IBM Plex Sans Arabic + Tajawal | Latin: Inter */}
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Tajawal:wght@300;400;500;700;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon placeholder */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
