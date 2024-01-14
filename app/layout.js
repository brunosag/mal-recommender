import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MAL Recommender',
  description: 'Get anime recommendations tailored to your likes!',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-1">{children}</div>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
