'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { NAV, normLocale } from '@/lib/i18n';

export default function SearchOverlay({ locale = 'ar' }: { locale?: string }) {
  const loc = normLocale(locale);
  const isAr = loc === 'ar';
  const t = NAV[loc];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // فتح/إغلاق بالكيبورد: Esc للإغلاق
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    // منع تمرير الخلفية
    document.body.style.overflow = 'hidden';
    // تركيز الحقل
    const id = setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      clearTimeout(id);
    };
  }, [open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    setOpen(false);
    setQ('');
    router.push(`/posts?lang=${loc}&q=${encodeURIComponent(term)}`);
  }

  return (
    <>
      {/* زر البحث */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.searchTitle}
        className="p-2 rounded-full text-navy hover:bg-paper-100 hover:text-brand transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {/* الطبقة العلوية */}
      {open && (
        <div
          dir={isAr ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-24 md:pt-32 bg-navy-900/70 backdrop-blur-sm animate-[fadeIn_.15s_ease-out]"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={submit} className="flex items-center gap-3 px-5 py-4 border-b border-paper-200">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand flex-shrink-0">
                <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.search}
                className="flex-1 bg-transparent text-lg text-navy placeholder:text-ink-faint focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.searchClose}
                className="p-1.5 rounded-full text-ink-muted hover:bg-paper-100 hover:text-navy transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </form>
            <div className="px-5 py-3 flex items-center justify-between text-xs text-ink-muted">
              <span>{t.searchHint}</span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-paper-300 bg-paper-50 font-mono">Enter</kbd>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
