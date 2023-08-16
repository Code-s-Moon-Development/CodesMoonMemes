"use client";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useCallback, useRef, useState } from "react";
import { useVideo } from "../../context/video-context";
import VideoLayout from "./Layout/VideoLayout";

import classNames from "classnames";

import { hoverTimeUntilPlay } from "../../config";
import type { IVideoParams } from "../../types";

interface IVideoProps {
    video: IVideoParams;
    frameSize?: string;
    grow?: boolean;
    canPlay?: boolean;
}

const addView = async (videoId: string, currViewCount: number) => {
    await supabase
        .from("memes_data")
        .update({ viewCount: currViewCount + 1 })
        .eq("id", videoId);
};

export default function Video({ video, frameSize, grow, canPlay = true }: IVideoProps) {
    const { volume } = useVideo();
    const [videoTime, setVideoTime] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const muted = volume === 0;
    const timePercentage = (videoTime / (!videoRef?.current?.duration ? 1 : videoRef.current.duration)) * 100;

    useEffect(() => {
        if (!videoRef.current) return;
        videoRef.current.volume = volume;
    }, [volume]);

    const handlePlay = useCallback(() => {
        if (!videoRef.current || !canPlay) return;

        playTimeoutRef.current = setTimeout(() => {
            const playPromise = (videoRef.current as HTMLVideoElement).play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    addView(video.id, video.viewCount);
                });
            }
        }, hoverTimeUntilPlay);
    }, [canPlay, video.id, video.viewCount]);

    const handlePause = useCallback(() => {
        if (!playTimeoutRef.current || !videoRef.current) return;

        videoRef.current.pause();
        clearTimeout(playTimeoutRef.current);
    }, []);

    return (
        <VideoLayout
            video={video}
            size={frameSize}
            grow={grow}
            timePercentage={timePercentage}
            isLoaded={isLoaded}
            canPlay={canPlay}
            onMouseEnter={handlePlay}
            onMouseLeave={handlePause}
            className={classNames("select-none overflow-hidden rounded-md", {
                "group focus:overflow-visible focus-within:overflow-visible hover:overflow-visible": grow,
                "xs:w-72 sm:w-80 md:w-96": !frameSize,
                [frameSize as string]: frameSize,
            })}
        >
            <div className="flex h-full w-full items-center justify-center">
                <video
                    ref={videoRef}
                    preload="metadata"
                    className="relative h-auto min-h-full w-auto group-focus-within:h-full group-focus-within:w-full group-hover:h-full group-hover:w-full group-focus:h-full group-focus:w-full"
                    width={384}
                    height={216}
                    onCanPlay={() => setIsLoaded(true)}
                    onTimeUpdate={(e) => setVideoTime((e.target as HTMLVideoElement)?.currentTime ?? 0)}
                    muted={muted}
                    disablePictureInPicture
                    playsInline
                    loop
                >
                    <source src={`${video.url}#t=0.1`} />
                </video>
            </div>
        </VideoLayout>
    );
}
