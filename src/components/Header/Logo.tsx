import Image from "next/image";
import Link from "next/link";

// import { useSyncExternalStore } from "react";

import Icon from "../../../public/codesicon.png";

// function scrollSubscribe(callback: () => void) {
//     global.window?.addEventListener("scroll", callback);
//     return () => global.window?.removeEventListener("scroll", callback);
// }

// function useIsOnTop(selector = (id: number) => id) {
//     return useSyncExternalStore(
//         scrollSubscribe,
//         () => selector(global.window?.scrollY),
//         () => undefined
//     );
// }

export default function Logo() {
    return (
        <div className="flex h-full w-fit">
            <Link href="/" title="Inicio">
                <Image priority src={Icon} alt="Code's Moon Icon" height={64} className="aspect-auto" />
            </Link>
            <h2
                className="sr-only max-w-xs text-xs font-medium text-blue-700 opacity-0 transition-opacity md:inline-block"
            >
                Code&apos;s Moon Memes
            </h2>
        </div>
    );
}
