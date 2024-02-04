import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/context/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import SectionProvider from '@/components/context/section-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'mal-recommender',
  description: 'Get anime recommendations tailored to your likes!',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SectionProvider>
            <div className="flex flex-col h-screen">
              <Header />
              <div className="flex-1">{children}</div>
              <Toaster />
            </div>
          </SectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
