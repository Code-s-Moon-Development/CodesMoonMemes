import type { ReactNode } from "react";
import { Fragment, Suspense } from "react";

import { defaultFetchOptions } from "../../../config";
import getVideos from "../../../lib/getVideos";

import Video from "../../../components/Video/Video";
import VideoArraySkeleton from "../../../components/VideoArraySkeleton";
import { VideoProvider } from "../../../context/video-context";

export const revalidate = 60;

export default async function SidebarLayout({ children }: { children: ReactNode }) {
    const { videos } = await getVideos(defaultFetchOptions);

    return (
        <div className="ml-8 flex flex-col gap-6 md:flex-row 2xl:gap-8">
            <VideoProvider>
                <section className="flex-1">{children}</section>
                <aside className="overflow-y-scroll md:max-h-screen">
                    <h2 className="text-1xl mb-4 font-semibold 2xl:text-2xl">Videos mais recentes</h2>
                    <nav className="mr-6 grid grid-cols-1 gap-4 2xl:grid-cols-2">
                        <Suspense fallback={<VideoArraySkeleton />}>
                            {videos.map((video, i) => (
                                <Fragment key={i}>
                                    <Video frameSize="w-64" video={video} canPlay={false} />
                                </Fragment>
                            ))}
                        </Suspense>
                    </nav>
                </aside>
            </VideoProvider>
        </div>
    );
}
