import { Inter } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import './globals.css';
import Navbar from "../components/navBar";
// Import the Inter font
const inter = Inter({ subsets: ['latin'] });
import {Nunito} from '@next/font/google'
const nunito = Nunito({
  subsets:['latin'],
  weight: ['400' , '700']
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ nunito.className}>
        <AppRouterCacheProvider>
        <Navbar/>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
