// أدوات مساعدة مشتركة

/** يزيل وسوم HTML ويفك كيانات HTML الشائعة (للعناوين والمقتطفات) */
export function cleanText(html: string | null | undefined): string {
  if (!html) return '';
  return decodeEntities(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
}

/** يفك كيانات HTML مع الحفاظ على الوسوم (للمحتوى الكامل) */
export function decodeEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&#8230;/g, '…')
    .replace(/&hellip;/g, '…')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#8203;/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

/** يجهّز قائمة مرشحات للـ slug (يعالج ترميز URL العربي والأشكال المختلفة) */
export function slugCandidates(slug: string): string[] {
  const encLower = (s: string) =>
    encodeURIComponent(s).replace(/%[0-9a-f]{2}/gi, (m) => m.toLowerCase());
  let decoded = slug;
  try { decoded = decodeURIComponent(slug); } catch {}
  return Array.from(new Set([
    slug,
    slug.toLowerCase(),
    decoded,
    encLower(decoded),
    encLower(decoded.normalize('NFC')),
    encLower(decoded.normalize('NFD')),
  ]));
}

/** تنسيق التاريخ حسب اللغة */
export function formatDate(date: string | null | undefined, locale: string): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

/** الحصول على أول عنصر ترجمة من مصفوفة أو كائن */
export function firstTr<T>(tr: T | T[] | null | undefined): T | undefined {
  if (!tr) return undefined;
  return Array.isArray(tr) ? tr[0] : tr;
}
