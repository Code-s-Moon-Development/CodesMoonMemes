import "../index.css";

import { Inter } from "@next/font/google";
import Header from "../components/Header/Header";

import { SearchProvider } from "../context/search-context";
import { FavoritesProvider } from "../context/favorites-context";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className={inter.variable}>
            <body dir="ltr" className="md:overflow-hidden">
                <SearchProvider>
                    <FavoritesProvider>
                        <Header />
                        <a
                            href="#main-content"
                            className="absolute top-0 z-50 mx-4 -translate-y-full rounded-b-lg bg-[#ffcf00] px-3 py-2 text-base font-medium text-gray-100 transition-all hover:bg-[#ac8c00] hover:text-white hover:no-underline focus:translate-y-0 focus:outline-none focus:ring-4 focus:ring-[#ffcf00]"
                        >
                            Pular a conteúdo principal
                        </a>

                        <main className="relative mt-32 h-full w-full md:mt-20">{children}</main>
                    </FavoritesProvider>
                </SearchProvider>
            </body>
        </html>
    );
}
