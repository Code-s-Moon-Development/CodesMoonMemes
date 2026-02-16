"use client";

import type { ReactNode } from "react";
import { forwardRef, useCallback, useDeferredValue, useState } from "react";
import { useSearch } from "../../context/search-context";

import classNames from "classnames";
import type { Components } from "react-virtuoso";
import { defaultFetchOptions } from "../../config";
import { VideoProvider } from "../../context/video-context";
import type { IFetchOptionsProps, IVideoParams } from "../../types";

import { VirtuosoGrid } from "react-virtuoso";
import Placeholder from "../Video/Placeholder";
import Video from "../Video/Video";
import Footer from "./Footer";

interface IFeedProps {
    initialVideos: IVideoParams[];
    children: ReactNode;
}

async function loadMore(options: IFetchOptionsProps, search?: string): Promise<{ data: IVideoParams[]; ended: boolean }> {
    const params = new URLSearchParams({
        offset: String(options.offset),
        limit: String(options.limit),
        orderColumn: options.order.column,
        orderAsc: String(options.order.options?.ascending ?? false),
        ...(search ? { search } : {}),
    });
    const res = await fetch(`/api/videos?${params}`);
    console.log(res);
    if (!res.ok) throw new Error("Failed to load videos");
    const { videos, endReached } = (await res.json()) as { videos: IVideoParams[]; endReached: boolean };
    return { data: videos, ended: endReached };
}

// eslint-disable-next-line react/display-name
const Scroller: Components["Scroller"] = forwardRef(({ style, ...props }, ref) => {
    return (
        <div
            style={style}
            ref={ref}
            className="min-h-screen w-full pr-2 overflow-x-hidden scrollbar-thin scrollbar-track-black/10 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-md hover:scrollbar-thumb-gray-200"
            {...props}
        />
    );
});

export default function Feed({ initialVideos, children }: IFeedProps) {
    const [videos, setVideos] = useState<IVideoParams[]>(initialVideos);

    const { search } = useSearch();
    const deferredSearchQuery = useDeferredValue(search);
    const isStale = search !== deferredSearchQuery;

    const handleLoadingState = useCallback(({ data }: { data: IVideoParams[] }) => {
        setVideos((lastVideos) => [...lastVideos, ...data]);
    }, []);

    // useEffect(() => {
    //     const fetchFromSearch = async () => {
    //         const { data } = await loadMore(defaultFetchOptions, search);

    //         // replace feed with search results
    //         startTransition(() => {
    //             setVideos(data);
    //         });
    //     };

    //     fetchFromSearch();
    // }, [search]);

    const ChildrenRender = () => {
        return <>{children}</>;
    };

    return (
        <section id="main-content" className="relative flex h-fit min-h-screen w-full flex-col items-center justify-center">
            <VideoProvider>
                <VirtuosoGrid
                    data={videos}
                    listClassName={classNames("mt-6 m-2 flex h-fit w-full flex-wrap items-center justify-center gap-4", {
                        "opacity-50": isStale,
                    })}
                    id="feed"
                    components={{
                        Scroller,
                        ScrollSeekPlaceholder: Placeholder,
                        Footer,
                        Header: search ? undefined : ChildrenRender,
                    }}
                    overscan={12}
                    totalCount={videos.length}
                    endReached={async (index) => {
                        handleLoadingState(await loadMore(Object.assign(defaultFetchOptions, { offset: index }), deferredSearchQuery));
                    }}
                    itemContent={(index, video) => {
                        return <Video video={video} grow />;
                    }}
                />
            </VideoProvider>
        </section>
    );
}
