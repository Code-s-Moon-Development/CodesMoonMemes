import Link from "next/link";
import Image from "next/image";

import Icon from "../../../public/codesicon.png";
import Github from "../../../public/svgs/github.svg";
import Discord from "../../../public/svgs/discord.svg";
import Upload from "../../../public/svgs/upload-alternate.svg";

import SearchBar from "./SearchBar";

export default function Header() {
    return (
        <header className="fixed left-0 right-0 top-0 z-50 w-full bg-[#161618]/90 py-2 px-4 md:h-20 md:py-0 md:px-12">
            <nav className="flex h-full w-full items-center justify-between text-base">
                <div className="mr-2 md:flex-1">
                    <Link href="/" title="Inicio">
                        <Image src={Icon} alt="Code's Moon Icon" height={64} className="aspect-auto" />
                    </Link>
                </div>
                <div className="hidden flex-1 md:block">
                    <SearchBar />
                </div>
                <div className="flex-1">
                    <ul className="flex items-center justify-end gap-2 md:gap-4">
                        <li className="rounded-lg border border-white py-1 px-4 hover:opacity-90">
                            <button className="flex items-center justify-center space-x-2">
                                <Image className="py-0.5" src={Upload} height={20} width={20} alt="Upload" />
                                <span className="text-sm font-medium text-white">Subir um video</span>
                            </button>
                        </li>
                        <li className="rounded-lg bg-[#5865F2] py-1 px-2 hover:opacity-90 md:px-4">
                            <a
                                className="flex items-center justify-center space-x-2"
                                href="https://discord.gg/XpTWUy72Cq"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Image src={Discord} height={24} width={24} alt="Discord Logo" />
                                <span className="hidden text-sm font-medium text-white md:block">Junte-se a nossa comunidade</span>
                            </a>
                        </li>
                        <li className="hidden md:block">
                            <a
                                href="https://github.com/Code-s-Moon-Development/CodesMoonMemes"
                                target="_blank"
                                rel="noreferrer"
                                title="Repositório"
                            >
                                <Image src={Github} height={32} width={32} alt="Github Logo" />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="mt-1 block w-full md:hidden">
                <SearchBar />
            </div>
        </header>
    );
}
