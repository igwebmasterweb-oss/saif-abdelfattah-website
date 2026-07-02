import { redirect } from 'next/navigation';
import { normLocale } from '@/lib/i18n';

interface Props { searchParams: Promise<{ lang?: string }>; }

// لا توجد كتب في قاعدة البيانات حاليًا — نعيد التوجيه إلى المقالات
export default async function BooksPage({ searchParams }: Props) {
  const sp = await searchParams;
  const loc = normLocale(sp.lang);
  redirect(`/posts?lang=${loc}`);
}
