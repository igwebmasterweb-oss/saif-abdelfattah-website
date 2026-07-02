'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('بيانات غير صحيحة. حاول مرة أخرى.');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#f5f4f2]"
      dir="rtl"
      style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
    >
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-lg border border-[#e8e6e3] shadow-sm overflow-hidden">
          {/* Header stripe */}
          <div className="bg-[#1e3a5f] px-8 py-6 text-center">
            <span className="block text-lg font-bold text-white mb-1">أ.د. سيف عبد الفتاح</span>
            <span className="block text-xs text-[#9fb2d1]">لوحة الإدارة</span>
            {/* Orange accent line */}
            <div className="flex justify-center mt-3">
              <span className="block w-8 h-0.5 bg-[#e8601c] rounded-full" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="px-8 py-7 space-y-5">
            <div>
              <label className="block text-xs font-medium text-[#1e3a5f] mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#e8e6e3] rounded px-3 py-2.5 text-sm text-[#1a1a1a] bg-[#fafaf9] focus:outline-none focus:border-[#1e3a5f] focus:bg-white transition-colors"
                placeholder="admin@example.com"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#1e3a5f] mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#e8e6e3] rounded px-3 py-2.5 text-sm text-[#1a1a1a] bg-[#fafaf9] focus:outline-none focus:border-[#1e3a5f] focus:bg-white transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e8601c] text-white font-semibold text-sm py-2.5 rounded hover:bg-[#c4511a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري الدخول...' : 'دخول'}
            </button>
          </form>
        </div>

        {/* Back to site link */}
        <div className="text-center mt-4">
          <a
            href="/"
            className="text-xs text-[#4a4a4a] hover:text-[#1e3a5f] transition-colors"
          >
            ← العودة إلى الموقع
          </a>
        </div>
      </div>
    </div>
  );
}
