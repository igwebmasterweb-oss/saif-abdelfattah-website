/**
 * WordPress → Supabase Data Migration Script
 * saif-abdelfattah-website
 *
 * Usage: npx tsx scripts/migrate.ts
 *
 * Requires env vars:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   WP_API_BASE (default: https://www.saifabdelfattah.net/wp-json/wp/v2)
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const WP_API_BASE = process.env.WP_API_BASE || 'https://www.saifabdelfattah.net/wp-json/wp/v2';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ---- Helpers ----
async function wpFetchAll(endpoint: string): Promise<any[]> {
  const results: any[] = [];
  let page = 1;
  while (true) {
    const url = `${WP_API_BASE}/${endpoint}?per_page=100&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) break;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    results.push(...data);
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
    if (page >= totalPages) break;
    page++;
  }
  return results;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// ---- Migrate Categories ----
async function migrateCategories() {
  console.log('\n[1/4] Migrating categories...');
  const wpCats = await wpFetchAll('categories');
  console.log(`  Found ${wpCats.length} categories`);

  for (const cat of wpCats) {
    // Upsert category
    const { data: catRow, error: catErr } = await supabase
      .from('categories')
      .upsert({ wp_id: cat.id, slug: cat.slug }, { onConflict: 'wp_id' })
      .select('id')
      .single();

    if (catErr) { console.error('  Category error:', cat.slug, catErr.message); continue; }

    // Arabic translation (WP is primarily Arabic)
    await supabase.from('category_translations').upsert({
      category_id: catRow.id,
      locale: 'ar',
      name: cat.name || cat.slug,
      description: stripHtml(cat.description || ''),
    }, { onConflict: 'category_id,locale' });

    // English fallback (use slug as placeholder)
    await supabase.from('category_translations').upsert({
      category_id: catRow.id,
      locale: 'en',
      name: cat.slug.replace(/-/g, ' '),
      description: '',
    }, { onConflict: 'category_id,locale' });

    console.log(`  ✓ ${cat.slug}`);
  }
}

// ---- Migrate Posts ----
async function migratePosts() {
  console.log('\n[2/4] Migrating posts...');
  const wpPosts = await wpFetchAll('posts');
  console.log(`  Found ${wpPosts.length} posts`);

  for (const post of wpPosts) {
    const status = post.status === 'publish' ? 'published' : 'draft';
    const featuredImg = post.jetpack_featured_media_url || post._links?.['wp:featuredmedia']?.[0]?.href || null;

    const { data: postRow, error: postErr } = await supabase
      .from('posts')
      .upsert({
        wp_id: post.id,
        slug: post.slug,
        status,
        featured_image_url: featuredImg,
        published_at: post.date ? new Date(post.date).toISOString() : null,
      }, { onConflict: 'wp_id' })
      .select('id')
      .single();

    if (postErr) { console.error('  Post error:', post.slug, postErr.message); continue; }

    // Arabic content translation
    await supabase.from('post_translations').upsert({
      post_id: postRow.id,
      locale: 'ar',
      title: post.title?.rendered || post.slug,
      excerpt: stripHtml(post.excerpt?.rendered || ''),
      content: post.content?.rendered || '',
    }, { onConflict: 'post_id,locale' });

    // Category relations
    if (post.categories?.length) {
      for (const wpCatId of post.categories) {
        const { data: catRow } = await supabase
          .from('categories')
          .select('id')
          .eq('wp_id', wpCatId)
          .single();
        if (catRow) {
          await supabase.from('post_categories').upsert({
            post_id: postRow.id,
            category_id: catRow.id,
          }, { onConflict: 'post_id,category_id' });
        }
      }
    }

    console.log(`  ✓ [${status}] ${post.slug}`);
  }
}

// ---- Migrate Pages ----
async function migratePages() {
  console.log('\n[3/4] Migrating pages...');
  const wpPages = await wpFetchAll('pages');
  console.log(`  Found ${wpPages.length} pages`);

  for (const page of wpPages) {
    const status = page.status === 'publish' ? 'published' : 'draft';

    const { data: pageRow, error: pageErr } = await supabase
      .from('pages')
      .upsert({
        wp_id: page.id,
        slug: page.slug,
        status,
        template: page.template || 'default',
      }, { onConflict: 'wp_id' })
      .select('id')
      .single();

    if (pageErr) { console.error('  Page error:', page.slug, pageErr.message); continue; }

    await supabase.from('page_translations').upsert({
      page_id: pageRow.id,
      locale: 'ar',
      title: page.title?.rendered || page.slug,
      content: page.content?.rendered || '',
    }, { onConflict: 'page_id,locale' });

    console.log(`  ✓ [${status}] ${page.slug}`);
  }
}

// ---- Migrate Media ----
async function migrateMedia() {
  console.log('\n[4/4] Migrating media metadata...');
  const wpMedia = await wpFetchAll('media');
  console.log(`  Found ${wpMedia.length} media items`);

  for (const item of wpMedia) {
    const { error } = await supabase.from('media').upsert({
      wp_id: item.id,
      file_name: item.slug || item.id.toString(),
      original_url: item.source_url,
      mime_type: item.mime_type,
      alt_text: item.alt_text || '',
      caption: stripHtml(item.caption?.rendered || ''),
    }, { onConflict: 'wp_id' });

    if (error) console.error('  Media error:', item.id, error.message);
  }
  console.log('  ✓ Media metadata migrated');
}

// ---- Seed Redirects for old WP URLs ----
async function seedRedirects() {
  console.log('\n[Bonus] Seeding common WP redirects...');
  const redirects = [
    { from_path: '/feed', to_path: '/ar', status_code: 301 },
    { from_path: '/wp-admin', to_path: '/admin', status_code: 301 },
    { from_path: '/wp-login.php', to_path: '/admin', status_code: 301 },
  ];
  for (const r of redirects) {
    await supabase.from('redirects').upsert(r, { onConflict: 'from_path' });
  }
  console.log('  ✓ Redirects seeded');
}

// ---- Main ----
async function main() {
  console.log('=== WordPress → Supabase Migration ===');
  console.log(`Source: ${WP_API_BASE}`);
  console.log(`Target: ${SUPABASE_URL}\n`);

  await migrateCategories();
  await migratePosts();
  await migratePages();
  await migrateMedia();
  await seedRedirects();

  console.log('\n=== Migration Complete ===');
}

main().catch(console.error);
