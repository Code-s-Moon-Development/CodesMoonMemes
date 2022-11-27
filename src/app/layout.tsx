import "../index.css"

import { Inter } from '@next/font/google';
import Header from "../components/Header/Header";

const inter = Inter({
    variable: '--font-inter',
  });

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html dir="ltr" lang="pt" className={inter.variable}>
        <body>
            <Header />
            {children}
        </body>
      </html>
    );
  }