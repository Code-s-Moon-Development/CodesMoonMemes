import { defaultFetchOptions } from "../config";
import getVideos from "../lib/getVideos";

import Feed from "../components/Feed/Feed";
import Hero from "../components/Hero";

import { FETCH_OFFSET } from "../config";
import type { IFetchOptionsProps } from "../types";

export const revalidate = 60;

const getFeedVideos = async (search?: string) => {
    return await getVideos(defaultFetchOptions, search);
};

const preload = (options: IFetchOptionsProps) => {
    void getVideos(options);
};

export default async function Page() {
    const videos = await getFeedVideos();
    preload(Object.assign(defaultFetchOptions, { offset: FETCH_OFFSET })); // Preload first client-side scroll fetch

    return (
        <Feed initialVideos={videos.videos}>
            <Hero />
            <h2 className="mt-6 pl-4 text-2xl font-semibold tracking-wide underline-offset-4 hover:underline md:mr-48 md:pl-16">
                <a href="#feed">Mais recentes</a>
            </h2>
        </Feed>
    );
}
