import Image from "next/image";
import Discord from "../../../public/svgs/discord.svg";
import Upload from "../Upload/Upload";
import Favorites from "./Favorites";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Header() {
    return (
        <header className="fixed left-0 right-0 top-0 z-50 w-full bg-[#161618]/90 py-2 px-4 md:h-20 md:py-0 md:px-12">
            <nav className="flex h-full w-full items-center justify-between gap-2 text-base">
                <div className="mr-2 md:flex-1">
                    <Logo />
                </div>
                <div className="hidden flex-1 md:block" />
                <div className="flex-1 shrink">
                    <ul className="flex items-center justify-end gap-2 2xl:gap-4">
                        <li className="rounded-lg border border-white/10 py-1 px-4 hover:border-[#ffcc00]/50 hover:opacity-90">
                            <Upload />
                        </li>
                        <li className="rounded-lg border-white/10 bg-[#5865F2] py-1 px-2 hover:opacity-90 md:px-4">
                            <a
                                className="flex items-center justify-center space-x-2"
                                href="https://discord.gg/XpTWUy72Cq"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Image src={Discord} height={24} width={24} alt="Discord Logo" />
                                <span className="hidden text-xs font-medium text-white md:block 2xl:text-sm">
                                    Junte-se a nossa comunidade
                                </span>
                            </a>
                        </li>
                        <li>
                            <Favorites />
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="block w-full md:hidden">
                <SearchBar />
            </div>
        </header>
    );
}
