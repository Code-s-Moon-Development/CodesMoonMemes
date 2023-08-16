"use client";

import { useEffect } from "react";

export default function MetaUpdater({ url }: { url: string }) {
    useEffect(() => {
        const videoMeta = document.createElement("meta");
        const videoMeta2 = document.createElement("meta");
        videoMeta.setAttribute("property", "og:url");
        videoMeta.setAttribute("content", url);
        videoMeta2.setAttribute("property", "og:video:url");
        videoMeta2.setAttribute("content", url);

        document.head.appendChild(videoMeta);
        document.head.appendChild(videoMeta2);
    }, [url]);

    return null;
}
