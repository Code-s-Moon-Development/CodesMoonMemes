"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";
import * as HoverCard from "@radix-ui/react-hover-card";

import { useVideo } from "../../../context/video-context";

import VolumeMuted from "../../../../public/svgs/volume-muted.svg";
import VolumePlaying from "../../../../public/svgs/volume-playing.svg";

export default function VolumeControl({ parent }: { parent: HTMLElement | null }) {
    const { volume, setVolume } = useVideo();

    const lastVolume = useRef<number | null>(null);
    const muted = volume === 0;

    useEffect(() => {
        // get persisted volume from storage
        lastVolume.current = Number(localStorage.getItem("volume"));
    }, []);

    const handleMuteToggle = () => {
        if (!muted) {
            lastVolume.current = volume;
            setVolume(0);
            return;
        }

        if (muted && lastVolume.current) {
            setVolume(lastVolume.current);
            return;
        }

        // is muted and there is no lastVolume
        setVolume(1);
    };

    return (
        <HoverCard.Root openDelay={50}>
            <HoverCard.Trigger asChild>
                <button
                    onClick={handleMuteToggle}
                    className="absolute right-0 bottom-0 m-1 mr-9 cursor-default rounded-md p-1 text-xs text-white/75 opacity-0 transition-opacity focus:bg-white/10 group-focus-within:opacity-75 group-hover:opacity-75 group-focus:opacity-75 hover:bg-white/10 hover:opacity-100"
                    title="Controle de Volume"
                >
                    <Image className="shadow" height={18} width={18} src={muted ? VolumeMuted : VolumePlaying} alt="Volume" />
                </button>
            </HoverCard.Trigger>
            <HoverCard.Portal container={parent}>
                <HoverCard.Content avoidCollisions={false} side="left" hideWhenDetached>
                    <input
                        className="max-h-2 rotate-180 appearance-none rounded-md bg-gray-400 bg-opacity-75"
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(event) => setVolume(event.target.valueAsNumber)}
                    />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
}
