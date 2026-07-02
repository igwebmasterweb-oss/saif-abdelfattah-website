import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'أ.د. سيف الدين عبد الفتاح | المدرسة الحضارية',
  description: 'الموقع الرسمي للأستاذ الدكتور سيف الدين عبد الفتاح - مقالات، كتب، فيديوهات، ودراسات في الفكر الحضاري الإسلامي',
  metadataBase: new URL('https://www.saifabdelfattah.net'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-tajawal antialiased">
        {children}
      </body>
    </html>
  )
}
