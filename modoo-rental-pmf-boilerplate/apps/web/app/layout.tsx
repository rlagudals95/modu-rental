import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = [
  { href: '/', label: '랜딩' },
  { href: '/consult', label: '상담신청' },
  { href: '/admin', label: '운영관리' }
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white text-slate-900">
        <div className="mx-auto min-h-screen max-w-5xl px-4 py-8">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <Link href="/" className="text-lg font-bold">모두의렌탈</Link>
            <nav className="flex gap-4 text-sm text-slate-700">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-blue-700">
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
