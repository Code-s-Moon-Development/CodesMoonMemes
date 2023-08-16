"use client";

import { useState, createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";

export interface IVideoContextProps {
    volume: number;
    setVolume: (volume: number) => void;
}

const InitialPlayerValue: IVideoContextProps = {
    volume: 0,
    setVolume: () => undefined,
};

export const VideoPlayerContext = createContext<IVideoContextProps>(InitialPlayerValue);

export function VideoProvider({ children }: { children: ReactNode }) {
    const [volume, setVolume] = useState<number>(InitialPlayerValue.volume);

    const handleSetVolume = (volume: number) => {
        setVolume(volume);

        const localStorageVolume = Number(localStorage.getItem("volume"));
        if (localStorageVolume === volume) return;

        // Save current volume to storage 
        localStorage.setItem("volume", volume.toString());
    };

    const videoPlayerContextValue: IVideoContextProps = useMemo(
        () => ({
            volume,
            setVolume: handleSetVolume,
        }),
        [volume]
    );

    return <VideoPlayerContext.Provider value={videoPlayerContextValue}>{children}</VideoPlayerContext.Provider>;
}

export function useVideo() {
    return useContext(VideoPlayerContext);
}
