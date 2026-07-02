import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
 title: { default: 'لوحة التحكم', template: '%s | لوحة التحكم' },
};

const navItems = [
 { label: 'الرئيسية', href: '/admin', icon: '⊞' },
 { label: 'المقالات', href: '/admin/posts', icon: '✎' },
 { label: 'الصفحات', href: '/admin/pages', icon: '◫' },
 { label: 'التصنيفات', href: '/admin/categories', icon: '⊛' },
 { label: 'الوسائط', href: '/admin/media', icon: '⊡' },
 { label: 'الإعدادات', href: '/admin/settings', icon: '⚙' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
 return (
 <html lang="ar" dir="rtl">
 <head>
 <link rel="preconnect" href="https://fonts.googleapis.com" />
 <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
 <link
 href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap"
 rel="stylesheet"
 />
 </head>
 <body
 className="min-h-screen bg-[#f5f4f2]"
 style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
 >
 <div className="flex min-h-screen">
 {/* ===== SIDEBAR ===== */}
 <aside
 className="w-56 shrink-0 bg-[#1e3a5f] text-white flex flex-col"
 style={{ minHeight: '100vh' }}
 >
 {/* Brand mark */}
 <div className="px-6 py-5 border-b border-[#2d5491]">
 <span className="block text-sm font-bold text-white leading-tight">
 أ.د. سيف عبد الفتاح
 </span>
 <span className="block text-xs text-[#9fb2d1] mt-0.5">لوحة الإدارة</span>
 </div>
 {/* Nav */}
 <nav className="flex-1 px-3 py-4 space-y-0.5">
 {navItems.map((item) => (
 <Link
 key={item.href}
 href={item.href}
 className="flex items-center gap-3 px-3 py-2 rounded text-sm text-[#c5d1e4] hover:bg-[#2d5491] hover:text-white transition-colors"
 >
 <span className="text-[#e8601c] text-base w-5 text-center">{item.icon}</span>
 {item.label}
 </Link>
 ))}
 </nav>
 {/* Logout */}
 <div className="px-3 py-4 border-t border-[#2d5491]">
 <form action="/admin/logout" method="POST">
 <button
 type="submit"
 className="w-full flex items-center gap-3 px-3 py-2 rounded text-sm text-[#c5d1e4] hover:bg-red-700 hover:text-white transition-colors"
 >
 <span className="text-base w-5 text-center">⏻</span>
 تسجيل الخروج
 </button>
 </form>
 </div>
 </aside>
 {/* ===== MAIN CONTENT ===== */}
 <div className="flex-1 flex flex-col">
 {/* Top bar */}
 <header className="bg-white border-b border-[#e8e6e3] h-14 flex items-center px-6 justify-between sticky top-0 z-40">
 <div className="flex items-center gap-2">
 <span className="w-1 h-5 bg-[#e8601c] rounded-full inline-block" />
 <span className="text-sm font-semibold text-[#1e3a5f]">لوحة التحكم</span>
 </div>
 <Link
 href="/"
 target="_blank"
 className="text-xs text-[#1e3a5f] border border-[#1e3a5f] px-3 py-1 rounded hover:bg-[#1e3a5f] hover:text-white transition-colors"
 >
 عرض الموقع ↗
 </Link>
 </header>
 {/* Page content */}
 <main className="flex-1 p-6">
 {children}
 </main>
 </div>
 </div>
 </body>
 </html>
 );
}
