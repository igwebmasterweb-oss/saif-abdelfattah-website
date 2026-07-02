// نصوص الواجهة بلغتين

export type Locale = 'ar' | 'en';

export function normLocale(v?: string | null): Locale {
  return v === 'en' ? 'en' : 'ar';
}

export const SITE = {
  ar: {
    name: 'سيف الدين عبد الفتاح',
    fullName: 'أ.د. سيف الدين عبد الفتاح',
    tagline: 'مقالات ودراسات في الفكر السياسي والحضاري',
  },
  en: {
    name: 'Saif Abd Al-Fattah',
    fullName: 'Prof. Saif Al-Din Abd Al-Fattah',
    tagline: 'Essays and studies in political and civilizational thought',
  },
} as const;

export const NAV = {
  ar: {
    home: 'الرئيسية',
    about: 'عن الكاتب',
    posts: 'المقالات',
    contact: 'تواصل',
    lang: 'English',
    rights: 'جميع الحقوق محفوظة',
    readMore: 'اقرأ المقال',
    back: 'العودة للمقالات',
    latest: 'أحدث المقالات',
    allCategories: 'كل الأقسام',
    search: 'ابحث في المقالات…',
    noResults: 'لا توجد مقالات مطابقة.',
    prev: 'السابق',
    next: 'التالي',
    page: 'صفحة',
    of: 'من',
    articlesCount: 'مقال',
    exploreAll: 'تصفّح كل المقالات',
    categories: 'الأقسام',
  },
  en: {
    home: 'Home',
    about: 'About',
    posts: 'Articles',
    contact: 'Contact',
    lang: 'عربي',
    rights: 'All rights reserved',
    readMore: 'Read article',
    back: 'Back to articles',
    latest: 'Latest articles',
    allCategories: 'All sections',
    search: 'Search articles…',
    noResults: 'No matching articles.',
    prev: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
    articlesCount: 'articles',
    exploreAll: 'Browse all articles',
    categories: 'Sections',
  },
} as const;
