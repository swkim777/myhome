import type { Metadata } from 'next';
import { ThemeProvider } from '../components/ThemeProvider';
import { AdminProvider } from '../context/AdminContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'JOWON AI Blog — 생성형 AI와 웹 기술의 만남',
  description: '생성형 AI와 웹 기술의 만남, 창작과 코드의 기록. Jowon의 포트폴리오 및 기술 블로그',
  keywords: ['AI', '강의', '클라우드', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Jowon'],
  authors: [{ name: 'Jowon' }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563EB'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 antialiased selection:bg-blue-500 selection:text-white transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AdminProvider>
            {/* Accessibility Skip Link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:font-semibold focus:shadow-lg focus:outline-none"
            >
              본문 바로가기
            </a>
            {children}
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
