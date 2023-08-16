import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import type { ReactNode } from "react";
import type { IVideoParams } from "../../../types";

import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import * as Progress from "@radix-ui/react-progress";

import classNames from "classnames";

import AltChip from "./AltChip";
import Favorite from "./Favorite";
import Share from "./Share";
import VolumeControl from "./VolumeControl";

import ExpandIcon from "../../../../public/svgs/expand-frame.svg";

interface IVideoLayoutProps {
    video: IVideoParams;
    timePercentage: number;
    grow?: boolean;
    isLoaded?: boolean;
    canPlay: boolean;
    children: ReactNode;
    [key: string]: unknown;
}

export default function VideoLayout({
    video,
    timePercentage = 0,
    isLoaded = false,
    grow = false,
    canPlay,
    children,
    ...rest
}: IVideoLayoutProps) {
    const layoutRef = useRef(null);

    return (
        <div {...rest}>
            <AspectRatio.Root
                ratio={16 / 9}
                className={classNames("relative h-full w-full overflow-hidden rounded-md", {
                    "brightness-95 transition ease-in group-focus-within:scale-110 group-hover:z-30 group-focus:z-30 group-focus-within:z-30 group-hover:scale-110 group-hover:bg-black group-hover:brightness-100 group-hover:delay-100 group-focus:scale-110 md:group-focus-within:scale-125 md:group-hover:scale-125 md:group-focus:scale-125":
                        grow,
                    "bg-[#131313]": isLoaded,
                })}
                ref={layoutRef}
            >
                {!isLoaded && grow ? <div className="absolute inset-0 -z-10 animate-pulse bg-[#131313]" /> : null}
                {children}
                {canPlay ? (
                    <>
                        <Favorite video={video} />
                        <Share video={video} />
                        <AltChip content={video.altText} />
                        <VolumeControl parent={layoutRef?.current} />
                        <Link
                            href={`/m?v=${video.name}`}
                            aria-label="Expandir"
                            className="absolute right-0 bottom-0 m-1 cursor-default rounded-md p-1 text-xs text-white/75 opacity-0 transition-opacity focus:bg-white/10 group-focus-within:opacity-75 group-hover:opacity-75 group-focus:opacity-75 hover:bg-white/10 hover:opacity-100"
                        >
                            <Image src={ExpandIcon} height={18} width={18} alt="" />
                        </Link>
                        <Progress.Root
                            value={timePercentage}
                            className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden opacity-0 transition-opacity group-hover:opacity-100"
                            style={{ transform: "translateZ(0)" }} // Fix overflow clipping in Safari
                        >
                            <Progress.Indicator
                                className="h-full w-full bg-white/75"
                                style={{ transform: `translateX(-${100 - timePercentage}%)` }}
                            />
                        </Progress.Root>
                        <span className="pointer-events-none absolute bottom-0 right-0 m-1 animate-fade-out-delayed rounded-md bg-black/50 py-1 px-2 text-xs font-normal transition-opacity group-focus-within:opacity-0 group-hover:opacity-0 group-focus:opacity-0">
                            Mantenha o cursor encima para ver
                        </span>
                    </>
                ) : null}
            </AspectRatio.Root>
        </div>
    );
}
