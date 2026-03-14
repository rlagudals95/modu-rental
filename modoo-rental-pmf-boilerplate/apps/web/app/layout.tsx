import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="mx-auto min-h-screen max-w-5xl px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
