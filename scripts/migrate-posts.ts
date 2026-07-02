/**
 * migrate-posts.ts
 * WordPress -> Supabase posts migration script
 *
 * Usage:
 *   npx ts-node scripts/migrate-posts.ts
 *
 * Required env vars (.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   WP_API_BASE  (e.g. https://www.saifabdelfattah.net/wp-json/wp/v2)
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const WP_BASE = process.env.WP_API_BASE || 'https://www.saifabdelfattah.net/wp-json/wp/v2';

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// ────────────────────────────────────────
// Helpers
// ────────────────────────────────────────
function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

async function fetchAllPages<T>(endpoint: string): Promise<T[]> {
  let page = 1;
  const perPage = 100;
  const results: T[] = [];

  while (true) {
    const url = `${WP_BASE}/${endpoint}?per_page=${perPage}&page=${page}&_fields=id,slug,status,date,title,content,excerpt,featured_media,categories,tags,acf`;
    const res = await fetch(url);
    if (!res.ok) break;
    const data: T[] = await res.json();
    if (!data.length) break;
    results.push(...data);
    const total = parseInt(res.headers.get('X-WP-TotalPages') || '1');
    if (page >= total) break;
    page++;
  }

  return results;
}

async function fetchMediaUrl(mediaId: number): Promise<string | null> {
  if (!mediaId) return null;
  const res = await fetch(`${WP_BASE}/media/${mediaId}?_fields=source_url`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.source_url || null;
}

// ────────────────────────────────────────
// Main migration
// ────────────────────────────────────────
async function migratePosts() {
  console.log('\n=== Starting WordPress -> Supabase posts migration ===\n');

  const wpPosts = await fetchAllPages<any>('posts');
  console.log(`Fetched ${wpPosts.length} posts from WordPress`);

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const wp of wpPosts) {
    try {
      // Only migrate published posts
      if (wp.status !== 'publish') { skipped++; continue; }

      const slug = wp.slug || slugify(wp.title?.rendered || String(wp.id));
      const featuredImageUrl = wp.featured_media ? await fetchMediaUrl(wp.featured_media) : null;

      // Upsert post record
      const { data: postRecord, error: postError } = await supabase
        .from('posts')
        .upsert(
          { slug, status: 'published', featured_image_url: featuredImageUrl, published_at: wp.date },
          { onConflict: 'slug', ignoreDuplicates: false }
        )
        .select('id')
        .single();

      if (postError || !postRecord) {
        console.error(`  ERROR upserting post slug=${slug}:`, postError?.message);
        errors++;
        continue;
      }

      const postId = postRecord.id;

      // Arabic translation (default WP content)
      const titleAr = wp.title?.rendered || '';
      const excerptAr = wp.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || '';
      const contentAr = wp.content?.rendered || '';

      const { error: trError } = await supabase
        .from('post_translations')
        .upsert(
          { post_id: postId, locale: 'ar', title: titleAr, excerpt: excerptAr, content: contentAr },
          { onConflict: 'post_id,locale', ignoreDuplicates: false }
        );

      if (trError) {
        console.error(`  ERROR upserting AR translation for post ${postId}:`, trError.message);
      }

      // English translation placeholder (same content until manually translated)
      const { error: trEnError } = await supabase
        .from('post_translations')
        .upsert(
          { post_id: postId, locale: 'en', title: titleAr, excerpt: excerptAr, content: contentAr },
          { onConflict: 'post_id,locale', ignoreDuplicates: true }  // skip if EN already exists
        );

      if (trEnError) {
        console.error(`  WARN upserting EN translation for post ${postId}:`, trEnError.message);
      }

      inserted++;
      if (inserted % 20 === 0) console.log(`  Migrated ${inserted}/${wpPosts.length} posts...`);
    } catch (e) {
      console.error('  Unexpected error:', e);
      errors++;
    }
  }

  console.log(`\n=== Migration complete ===`);
  console.log(`  Inserted/updated: ${inserted}`);
  console.log(`  Skipped:          ${skipped}`);
  console.log(`  Errors:           ${errors}`);
}

migratePosts().catch(console.error);
