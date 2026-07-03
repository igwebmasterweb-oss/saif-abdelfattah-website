// بنية القائمة الرئيسية — مطابقة لتقسيم الموقع القديم، بالأقسام التي لها محتوى فعلي فقط.
// معرّفات الأقسام من قاعدة البيانات (categories).

export interface MenuCat { id: string; label: { ar: string; en: string }; }

// أقسام المقالات (القائمة المنسدلة) — مصادر النشر الفعلية التي لها مقالات
export const ARTICLE_MENU: MenuCat[] = [
  { id: 'c55b5118-4b46-4fbb-bd46-ecbd02a02eb7', label: { ar: 'مقالات عربي ٢١', en: 'Arabi 21' } },
  { id: 'c2195e15-af95-42be-80db-125a60595abb', label: { ar: 'مقالات العربي الجديد', en: 'Al-Araby Al-Jadeed' } },
  { id: '84b4c0e4-6d94-4efb-a300-ef79f6774ba2', label: { ar: 'مقالات الشروق', en: 'Al-Shorouk' } },
  { id: '7bb06b9b-9891-44bb-8b5b-f6a21d28e612', label: { ar: 'مقالات الأهرام', en: 'Al-Ahram' } },
  { id: '6494f2e4-8e9f-4160-ad90-fd079a9f4c83', label: { ar: 'المسلم المعاصر', en: 'Al-Muslim Al-Muasir' } },
  { id: 'c646f1db-51b8-4865-956d-171763981afa', label: { ar: 'مجلة المجتمع', en: 'Al-Mujtama' } },
  { id: '556e14c3-ea77-4189-9375-a7cad54e4e15', label: { ar: 'مقالات الجزيرة', en: 'Al-Jazeera' } },
];

// أقسام لها محتوى وتظهر كروابط مستقلة في المينو
export const CATS = {
  studies: 'f36403ba-9696-46fd-9996-9a3d7122de3f',   // الدراسات (50)
  books: '67462d37-341d-4f0e-a234-ec17fbdbadf3',       // الكتب (11)
  podcast: '1dbe4049-95c8-4ba8-a758-9133239146bd',     // بودكاست (7)
  highlights: '953bcf31-9bbb-46b4-a78f-6b317fc06431',  // إضاءات حضارية (4)
};

export function catHref(loc: string, catId: string) {
  return `/posts?lang=${loc}&cat=${catId}`;
}
