import { getServerClient } from '@/lib/supabase/server';
import { firstTr, slugCandidates } from '@/lib/utils';
import type { Locale } from '@/lib/i18n';

export interface PostRow {
  id: string;
  slug: string;
  published_at: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  title: string;
  excerpt: string | null;
}

interface RawPost {
  id: string;
  slug: string;
  published_at: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  post_translations: { title: string; excerpt: string | null }[] | { title: string; excerpt: string | null } | null;
}

function shape(row: RawPost): PostRow {
  const tr = firstTr(row.post_translations);
  return {
    id: row.id,
    slug: row.slug,
    published_at: row.published_at,
    featured_image_url: row.featured_image_url,
    featured_image_alt: row.featured_image_alt,
    title: tr?.title ?? '',
    excerpt: tr?.excerpt ?? null,
  };
}

const SELECT = `id, slug, published_at, featured_image_url, featured_image_alt,
  post_translations!inner(title, excerpt, locale)`;

/** أحدث المقالات (للصفحة الرئيسية) */
export async function getLatestPosts(locale: Locale, limit = 9): Promise<PostRow[]> {
  const supabase = await getServerClient();
  const { data } = await supabase
    .from('posts')
    .select(SELECT)
    .eq('status', 'published')
    .eq('post_translations.locale', locale)
    .order('published_at', { ascending: false })
    .limit(limit);
  return (data ?? []).map(shape);
}

/** قائمة الأقسام مع عدد المقالات المنشورة */
export interface CategoryRow { id: string; slug: string; name: string; count: number; }

export async function getCategories(locale: Locale): Promise<CategoryRow[]> {
  const supabase = await getServerClient();
  // نجلب الأقسام مع الترجمة، ثم نحسب العدد عبر post_categories
  const { data: cats } = await supabase
    .from('categories')
    .select(`id, slug, category_translations!inner(name, locale), post_categories(post_id)`)
    .eq('category_translations.locale', locale);
  if (!cats) return [];
  const rows: CategoryRow[] = cats.map((c: any) => {
    const tr = firstTr(c.category_translations);
    return {
      id: c.id,
      slug: c.slug,
      name: tr?.name ?? '',
      count: Array.isArray(c.post_categories) ? c.post_categories.length : 0,
    };
  });
  return rows.filter((r) => r.count > 0).sort((a, b) => b.count - a.count);
}

/** مقالات مقسّمة لصفحات، مع تصفية اختيارية بالقسم والبحث */
export async function getPostsPage(opts: {
  locale: Locale;
  page: number;
  perPage: number;
  categoryId?: string | null;
  q?: string | null;
}): Promise<{ posts: PostRow[]; total: number }> {
  const { locale, page, perPage, categoryId, q } = opts;
  const supabase = await getServerClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  // مسار التصفية بالقسم: نجلب معرّفات المقالات في هذا القسم أولاً
  let postIds: string[] | null = null;
  if (categoryId) {
    const { data: pcs } = await supabase
      .from('post_categories')
      .select('post_id')
      .eq('category_id', categoryId);
    postIds = (pcs ?? []).map((r: any) => r.post_id);
    if (postIds.length === 0) return { posts: [], total: 0 };
  }

  let query = supabase
    .from('posts')
    .select(SELECT, { count: 'exact' })
    .eq('status', 'published')
    .eq('post_translations.locale', locale);

  if (postIds) query = query.in('id', postIds);
  if (q && q.trim()) query = query.ilike('post_translations.title', `%${q.trim()}%`);

  query = query.order('published_at', { ascending: false }).range(from, to);

  const { data, count } = await query;
  return { posts: (data ?? []).map(shape), total: count ?? 0 };
}

/** مقال واحد بالكامل حسب الـ slug */
export interface FullPost extends PostRow {
  content_html: string | null;
  categories: { id: string; slug: string; name: string }[];
}

export async function getPost(slug: string, locale: Locale): Promise<FullPost | null> {
  const supabase = await getServerClient();
  const candidates = slugCandidates(slug);
  const { data } = await supabase
    .from('posts')
    .select(`id, slug, published_at, featured_image_url, featured_image_alt,
      post_translations!inner(title, excerpt, content_html, locale),
      post_categories(categories(id, slug, category_translations(name, locale)))`)
    .in('slug', candidates)
    .eq('status', 'published')
    .eq('post_translations.locale', locale)
    .limit(1)
    .maybeSingle();

  if (!data) return null;
  const tr: any = firstTr((data as any).post_translations);
  const cats = ((data as any).post_categories ?? [])
    .map((pc: any) => {
      const cat = pc.categories;
      if (!cat) return null;
      const ctr = (cat.category_translations ?? []).find((x: any) => x.locale === locale)
        ?? firstTr(cat.category_translations);
      return { id: cat.id, slug: cat.slug, name: ctr?.name ?? '' };
    })
    .filter(Boolean);

  return {
    id: (data as any).id,
    slug: (data as any).slug,
    published_at: (data as any).published_at,
    featured_image_url: (data as any).featured_image_url,
    featured_image_alt: (data as any).featured_image_alt,
    title: tr?.title ?? '',
    excerpt: tr?.excerpt ?? null,
    content_html: tr?.content_html ?? null,
    categories: cats,
  };
}

/** مقالات ذات صلة (من نفس القسم) */
export async function getRelatedPosts(postId: string, categoryId: string | null, locale: Locale, limit = 3): Promise<PostRow[]> {
  if (!categoryId) return [];
  const supabase = await getServerClient();
  const { data: pcs } = await supabase
    .from('post_categories')
    .select('post_id')
    .eq('category_id', categoryId)
    .limit(30);
  const ids = (pcs ?? []).map((r: any) => r.post_id).filter((id: string) => id !== postId);
  if (ids.length === 0) return [];
  const { data } = await supabase
    .from('posts')
    .select(SELECT)
    .eq('status', 'published')
    .eq('post_translations.locale', locale)
    .in('id', ids.slice(0, 12))
    .order('published_at', { ascending: false })
    .limit(limit);
  return (data ?? []).map(shape);
}
