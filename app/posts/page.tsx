import Link from 'next/link';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const translations = {
ar: {
title: 'المقالات',
subtitle: 'أفكار وتحليلات في الفكر الحضاري والسياسي والاجتماعي',
read_more: 'اقرأ المزيد',
no_posts: 'لا توجد مقالات بعد',
lang_switch: 'English',
nav_about: 'عن الكاتب',
nav_posts: 'المقالات',
nav_books: 'الكتب',
nav_contact: 'تواصل',
},
en: {
title: 'Articles',
subtitle: 'Thoughts and analysis on civilizational, political, and social thought',
read_more: 'Read more',
no_posts: 'No articles yet',
lang_switch: 'عربي',
nav_about: 'About',
nav_posts: 'Articles',
nav_books: 'Books',
nav_contact: 'Contact',
},
};

function clean(html: string) {
if (!html) return '';
return html
.replace(/<[^>]*>/g, '')
.replace(/&#8230;/g, '…')
.replace(/&hellip;/g, '…')
.replace(/&nbsp;/g, ' ')
.replace(/&amp;/g, '&')
.replace(/&quot;/g, '"')
.replace(/&#39;/g, "'")
.replace(/&lt;/g, '<')
.replace(/&gt;/g, '>')
.replace(/\s+/g, ' ')
.trim();
}

async function getPosts(locale: string) {
const cookieStore = await cookies();
const supabase = createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{ cookies: { getAll: () => cookieStore.getAll() } }
);
const { data } = await supabase
.from('posts')
.select(`id, slug, published_at, featured_image_url, post_translations!inner(title, excerpt, locale)`)
.eq('status', 'published')
.eq('post_translations.locale', locale)
.order('published_at', { ascending: false });
return data || [];
}

interface Props { searchParams: Promise<{ lang?: string }>; }

export default async function PostsPage({ searchParams }: Props) {
const params = await searchParams;
const locale = params.lang === 'en' ? 'en' : 'ar';
const isAr = locale === 'ar';
const dir = isAr ? 'rtl' : 'ltr';
const t = translations[locale];
const posts = await getPosts(locale);
const other = isAr ? 'en' : 'ar';
return (
<div dir={dir} className="min-h-screen bg-warm-50">
<nav className="bg-white border-b border-warm-200 sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
<Link href={`/?lang=${locale}`} className="text-xl font-bold text-navy">
{isAr ? 'سيف عبد الفتاح' : 'Saif Abd Al-Fattah'}
</Link>
<div className="flex items-center gap-6">
{[
{ label: t.nav_about, href: `/about?lang=${locale}` },
{ label: t.nav_posts, href: `/posts?lang=${locale}` },
{ label: t.nav_books, href: `/books?lang=${locale}` },
{ label: t.nav_contact, href: `/contact?lang=${locale}` },
].map(({ label, href }) => (
<Link key={href} href={href} className="text-sm text-navy hover:text-brand transition-colors">
{label}
</Link>
))}
<Link href={`/posts?lang=${other}`} className="text-sm border border-navy rounded px-3 py-1 text-navy hover:bg-navy hover:text-white transition-colors">
{t.lang_switch}
</Link>
</div>
</div>
</nav>

<header className="max-w-6xl mx-auto px-6 py-12">
<h1 className="text-4xl font-bold text-navy">{t.title}</h1>
<div className="w-16 h-1 bg-brand my-4" />
<p className="text-gray-500">{t.subtitle}</p>
</header>

<main className="max-w-6xl mx-auto px-6 pb-20">
{posts.length === 0 ? (
<p className="text-center text-gray-400 py-20">{t.no_posts}</p>
) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{posts.map((post: any) => {
const tr = Array.isArray(post.post_translations) ? post.post_translations[0] : post.post_translations;
const date = post.published_at ? new Date(post.published_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
return (
<article key={post.id} className="bg-white border border-warm-200 rounded hover:shadow-md transition-shadow group">
<Link href={`/posts/${post.slug}?lang=${locale}`}>
{post.featured_image_url ? (
<div className="aspect-video overflow-hidden rounded-t">
<img src={post.featured_image_url} alt={tr?.title || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
</div>
) : (
<div className="aspect-video bg-navy-50 rounded-t flex items-center justify-center">
<span className="text-navy-200 text-3xl">★</span>
</div>
)}
<div className="p-5">
{date && <p className="text-xs text-gray-400 mb-2">{date}</p>}
<h2 className="text-sm font-semibold text-navy mb-2 line-clamp-2 group-hover:text-brand transition-colors">
{clean(tr?.title)}
</h2>
{tr?.excerpt && (
<p className="text-xs text-gray-500 line-clamp-3 mb-4">{clean(tr.excerpt)}</p>
)}
<span className="text-xs font-medium text-brand">{t.read_more} ←</span>
</div>
</Link>
</article>
);
})}
</div>
)}
</main>

<footer className="bg-navy text-white">
<div className="max-w-6xl mx-auto px-6 py-10">
<div className="flex flex-col md:flex-row items-center justify-between gap-4">
<p className="font-bold">{isAr ? 'أ.د. سيف الدين عبد الفتاح' : 'Prof. Saif Abd Al-Fattah'}</p>
<div className="flex gap-6 text-sm text-warm-200">
<Link href={`/posts?lang=${locale}`}>{t.nav_posts}</Link>
<Link href={`/about?lang=${locale}`}>{t.nav_about}</Link>
<Link href={`/contact?lang=${locale}`}>{t.nav_contact}</Link>
</div>
</div>
<div className="border-t border-navy-700 mt-8 pt-6 text-center text-sm text-warm-200">
{isAr ? '© 2025 جميع الحقوق محفوظة' : '© 2025 All rights reserved'}
</div>
</div>
</footer>
</div>
);
}
