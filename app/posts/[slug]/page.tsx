import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { getPost, getRelatedPosts } from '@/lib/queries';
import { cleanText, decodeEntities, formatDate } from '@/lib/utils';
import { NAV, normLocale } from '@/lib/i18n';

export const revalidate = 600;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = await searchParams;
  const loc = normLocale(lang);
  const post = await getPost(slug, loc);
  if (!post) return { title: NAV[loc].posts };
  const title = cleanText(post.title);
  const desc = cleanText(post.excerpt) || title;
  return {
    title,
    description: desc.slice(0, 160),
    openGraph: {
      title,
      description: desc.slice(0, 160),
      images: post.featured_image_url ? [post.featured_image_url] : undefined,
    },
  };
}

export default async function PostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const loc = normLocale(lang);
  const isAr = loc === 'ar';
  const t = NAV[loc];

  const post = await getPost(slug, loc);
  if (!post) notFound();

  const title = cleanText(post.title);
  const date = formatDate(post.published_at, loc);
  const alt = post.featured_image_alt || title;
  const primaryCat = post.categories[0] || null;
  const related = await getRelatedPosts(post.id, primaryCat?.id ?? null, loc, 3);

  const body = post.content_html ? decodeEntities(post.content_html) : '';

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-paper-50">
      <Suspense fallback={<div className="h-16 border-b border-paper-300" />}>
        <Navbar locale={loc} />
      </Suspense>

      <main className="flex-1">
        {/* ترويسة المقال */}
        <header className="bg-white border-b border-paper-300">
          <div className="max-w-prose mx-auto px-4 md:px-6 pt-12 md:pt-16 pb-10">
            <Link href={`/posts?lang=${loc}`} className="text-sm text-brand hover:text-brand-700">
              {isAr ? '→' : '←'} {t.back}
            </Link>

            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/posts?lang=${loc}&cat=${c.id}`}
                    className="chip bg-paper-100 border-paper-300 text-navy hover:border-brand hover:text-brand"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="font-display text-3xl md:text-[2.6rem] leading-tight font-bold text-navy mt-5">
              {title}
            </h1>

            {date && <p className="text-sm text-ink-muted mt-4">{date}</p>}
            <div className="ornament mt-6" />
          </div>
        </header>

        {/* صورة بارزة */}
        {post.featured_image_url && (
          <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-2 mb-10">
            <div className="rounded-xl overflow-hidden shadow-soft bg-paper-200 aspect-[16/9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.featured_image_url} alt={alt} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* المحتوى */}
        <article className="max-w-prose mx-auto px-4 md:px-6 pb-16">
          {body ? (
            <div className="article-body" dangerouslySetInnerHTML={{ __html: body }} />
          ) : (
            <p className="text-ink-muted">{t.noResults}</p>
          )}
        </article>

        {/* مقالات ذات صلة */}
        {related.length > 0 && (
          <section className="bg-white border-t border-paper-300">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-14">
              <p className="kicker">{t.latest}</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mt-2 mb-8">
                {isAr ? 'اقرأ أيضًا' : 'Read also'}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <PostCard key={r.id} post={r} locale={loc} variant="grid" />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer locale={loc} />
    </div>
  );
}
