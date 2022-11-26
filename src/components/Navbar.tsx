import Link from "next/link";
import Image from "next/image";

import Icon from "../../public/codesicon.png"

export default function Navbar() {
    return (
        <nav className="nav-container">
            <div>
                <Image src={Icon} alt="Code's Moon Icon" />
            </div>
            <div className="list-wrapper">
                <ul>
                    <li>
                        <Link href="/">
                            Memes
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            Sobre
                        </Link>
                    </li>
                    <li>
                        <a href="https://discord.gg/XpTWUy72Cq" target="_blank" rel="noreferrer">
                            Discord
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/Code-s-Moon-Development/CodesMoonMemes" target="_blank" rel="noreferrer">
                            Repositório
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
