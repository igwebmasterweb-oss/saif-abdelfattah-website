'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { NAV, normLocale } from '@/lib/i18n';
import type { CategoryRow } from '@/lib/queries';

export default function PostFilters({ locale, categories, activeCat, activeQ }: {
  locale: string;
  categories: CategoryRow[];
  activeCat?: string | null;
  activeQ?: string | null;
}) {
  const loc = normLocale(locale);
  const t = NAV[loc];
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(activeQ ?? '');

  useEffect(() => { setQ(activeQ ?? ''); }, [activeQ]);

  function navigate(next: URLSearchParams) {
    next.set('lang', loc);
    next.delete('page');
    router.push(`/posts?${next.toString()}`);
  }

  function selectCat(catId: string | null) {
    const next = new URLSearchParams(params?.toString());
    if (catId) next.set('cat', catId); else next.delete('cat');
    navigate(next);
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const next = new URLSearchParams(params?.toString());
    if (q.trim()) next.set('q', q.trim()); else next.delete('q');
    navigate(next);
  }

  return (
    <div className="space-y-5">
      {/* بحث */}
      <form onSubmit={submitSearch} className="relative max-w-md">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.search}
          className="w-full bg-white border border-paper-300 rounded-full ps-11 pe-4 py-2.5 text-sm text-navy placeholder:text-ink-faint focus:border-brand focus:outline-none transition-colors"
        />
        <button type="submit" aria-label="search"
          className="absolute inset-y-0 start-0 ps-4 flex items-center text-ink-muted hover:text-brand">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>

      {/* أقسام */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => selectCat(null)}
          className={`chip ${!activeCat ? 'bg-navy text-white border-navy' : 'bg-white border-paper-300 text-navy hover:border-brand hover:text-brand'}`}>
          {t.allCategories}
        </button>
        {categories.map((c) => (
          <button key={c.id} onClick={() => selectCat(c.id)}
            className={`chip ${activeCat === c.id ? 'bg-brand text-white border-brand' : 'bg-white border-paper-300 text-navy hover:border-brand hover:text-brand'}`}>
            {c.name}
            <span className={`ms-1.5 ${activeCat === c.id ? 'text-white/70' : 'text-ink-faint'}`}>{c.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
