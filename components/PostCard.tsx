import Link from 'next/link';
import { cleanText, formatDate } from '@/lib/utils';
import { NAV, normLocale } from '@/lib/i18n';
import type { PostRow } from '@/lib/queries';

export default function PostCard({ post, locale, variant = 'grid' }: {
  post: PostRow;
  locale: string;
  variant?: 'grid' | 'feature' | 'list';
}) {
  const loc = normLocale(locale);
  const t = NAV[loc];
  const title = cleanText(post.title);
  const excerpt = cleanText(post.excerpt);
  const date = formatDate(post.published_at, loc);
  const href = `/posts/${post.slug}?lang=${loc}`;
  const alt = post.featured_image_alt || title;

  if (variant === 'feature') {
    return (
      <article className="card group overflow-hidden md:grid md:grid-cols-2">
        <Link href={href} className="block relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-paper-200">
          {post.featured_image_url && (
            <img src={post.featured_image_url} alt={alt} loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          )}
        </Link>
        <div className="p-7 md:p-9 flex flex-col justify-center">
          {date && <p className="text-xs text-ink-muted mb-3">{date}</p>}
          <Link href={href}>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-navy leading-snug mb-3 group-hover:text-brand transition-colors">
              {title}
            </h3>
          </Link>
          {excerpt && <p className="text-ink-soft leading-relaxed line-clamp-3 mb-5">{excerpt}</p>}
          <Link href={href} className="text-sm font-medium text-brand hover:text-brand-700 self-start">
            {t.readMore} ←
          </Link>
        </div>
      </article>
    );
  }

  if (variant === 'list') {
    return (
      <article className="group flex gap-4 items-start py-5 border-b border-paper-300 last:border-0">
        <Link href={href} className="shrink-0 w-24 h-24 md:w-32 md:h-24 rounded-md overflow-hidden bg-paper-200">
          {post.featured_image_url && (
            <img src={post.featured_image_url} alt={alt} loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          )}
        </Link>
        <div className="min-w-0">
          {date && <p className="text-xs text-ink-muted mb-1.5">{date}</p>}
          <Link href={href}>
            <h3 className="font-display text-lg font-bold text-navy leading-snug line-clamp-2 group-hover:text-brand transition-colors">
              {title}
            </h3>
          </Link>
          {excerpt && <p className="text-sm text-ink-muted line-clamp-2 mt-1.5">{excerpt}</p>}
        </div>
      </article>
    );
  }

  // grid (افتراضي)
  return (
    <article className="card group overflow-hidden flex flex-col">
      <Link href={href} className="block relative aspect-[16/10] overflow-hidden bg-paper-200">
        {post.featured_image_url && (
          <img src={post.featured_image_url} alt={alt} loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        {date && <p className="text-xs text-ink-muted mb-2">{date}</p>}
        <Link href={href} className="flex-1">
          <h3 className="font-display text-lg font-bold text-navy leading-snug line-clamp-2 group-hover:text-brand transition-colors mb-2">
            {title}
          </h3>
          {excerpt && <p className="text-sm text-ink-muted line-clamp-3">{excerpt}</p>}
        </Link>
        <span className="text-xs font-medium text-brand mt-4">{t.readMore} ←</span>
      </div>
    </article>
  );
}
