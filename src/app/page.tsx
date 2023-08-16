import { defaultFetchOptions } from "../config";
import getVideos from "../lib/getVideos";

import Hero from "../components/Hero";
import Feed from "../components/Feed/Feed";
import Popular from "../components/Feed/Popular";

import { FETCH_OFFSET } from "../config";
import type { IFetchOptionsProps } from "../types";

export const revalidate = 60;

const getFeedVideos = async (search?: string) => {
    return await getVideos(defaultFetchOptions, search);
};

const getPopularVideosData = async () => {
    const options = {
        limit: 15,
        offset: 0,
        order: {
            column: "viewCount",
            options: {
                ascending: false,
            },
        },
    };
    return await getVideos(options);
};

const preload = (options: IFetchOptionsProps) => {
    void getVideos(options);
};

export default async function Page() {
    const videosData = getFeedVideos();
    const popularVideosData = getPopularVideosData();

    const [videos, popularVideos] = await Promise.all([videosData, popularVideosData]);

    preload(Object.assign(defaultFetchOptions, { offset: FETCH_OFFSET })); // Preload first client-side scroll fetch

    return (
        <Feed initialVideos={videos.videos}>
            <Popular popularVideosData={popularVideos.videos}>
                <Hero />
            </Popular>
            <h2 className="mt-6 pl-4 md:pl-20 text-2xl font-semibold tracking-wide underline-offset-4 hover:underline">
                <a href="#feed">Mais recentes</a>
            </h2>
        </Feed>
    );
}
