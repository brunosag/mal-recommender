import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/context/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import DataProvider from '@/components/context/data-provider';
import Header from '@/components/header';
import Loading from './loading';

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
					<DataProvider>
						<Loading />
            <div className="flex flex-col h-screen">
              <Header />
              {children}
              <Toaster />
            </div>
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
