"use client"
import { useRef, useEffect } from "react";

import { env } from "../../env/client.mjs";

export default function Video({ url }: { url?: string }) {
    const videoPlayer = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!videoPlayer.current) return
        videoPlayer.current.volume = 0.4;
    }, [videoPlayer]);

    return url ? (
        <>
            {url.startsWith(env.NEXT_PUBLIC_SUPABASE_URL) ? ( // to make sure url always comes from API
                <div className="video-wrapper w-[300px] h-[220px] overflow-hidden transition-transform ease-in duration-500">
                    <div className="video-inner-wrapper">
                        <video
                            className="min-h-full w-auto h-auto cursor-pointer relative z-10 hover:w-full hover:h-full"
                            ref={videoPlayer}
                            onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                            onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                            controls
                            disablePictureInPicture
                            controlsList="nofullscreen nodownload noremoteplayback"
                        >
                            <source src={url} type="video/mp4" />
                        </video>
                    </div>
                </div>
            ) : null}
        </>
    ) : (
        <div className="video-wrapper w-[300px] h-[220px] overflow-hidden transition-transform ease-in duration-500">
            <div className="video-inner-wrapper">
                <div className="w-[300px] h-[220px] min-h-full z-10 bg-[#222222] animate-pulse" />
            </div>
        </div>
    );
}
