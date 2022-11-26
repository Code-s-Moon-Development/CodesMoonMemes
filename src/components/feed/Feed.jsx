"use client"

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image"

import VideoWrapper from "./VideoWrapper";
import Spinner from "./Spinner";
import Final from "./Final";

import Lightning from "../../../public/lightning-bolt.png"

function Feed() {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchOptions, setFetchOptions] = useState({ limit: 15, offset: 0, sortBy: { column: "created_at", order: "desc" } });
    const [endReached, setEndReached] = useState(false);

    const [videos, setVideos] = useState([]);
    
    const sanitizeVideos = (data) => {
        const tempData = [...new Set(data)]; // remove any possible duplicates

        tempData?.forEach((video) => {
            const { publicURL, error } = supabase.storage.from("cmemes").getPublicUrl(video.name);
            if (error) throw new Error(error);

            setVideos((lastVideos) => [
                ...lastVideos,
                {
                    name: video.name,
                    url: publicURL,
                    date: video.updated_at,
                },
            ]);
        });
    };

    const getVideos = useCallback(async (isLoading, options) => {
        if (!isLoading) {
            setIsLoading(true);

            const { data, error } = await supabase.storage.from("cmemes").list(undefined, options);
            if (error) throw new Error(error);

            sanitizeVideos(data);
            setFetchOptions((lastOptions) => ({ ...lastOptions, offset: lastOptions.offset + 15 }));

            setIsLoading(false);
            if (data.length === 0) {
                setEndReached(true);
            } else setEndReached(false);
        }
    }, []);

    const refreshVideos = (loadingState, options) => {
        const currOptions = Object.assign({}, options);
        currOptions.offset = 0;
        setFetchOptions((lastOptions) => ({ ...lastOptions, offset: 0 }));

        setVideos([]);
        getVideos(loadingState, currOptions);
    };

    useEffect(() => {
        // Initial fetch
        let mounted = true;
        if (mounted) getVideos(false, fetchOptions);

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        // Fetch more videos if scrolled to the end of the page
        let mounted = true;
        const checkScrollPos = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 150 && !isLoading && !endReached) {
                getVideos(isLoading, fetchOptions);
            }
        };

        if (mounted) document.addEventListener("scroll", checkScrollPos, { passive: true });

        return () => {
            document.removeEventListener("scroll", checkScrollPos);
            mounted = false;
        };
    }, [endReached, isLoading, getVideos, fetchOptions]);

    return (
        <>
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-fit flex justify-center items-center flex-col">
                    <div className="flex flex-nowrap justify-between items-center my-8 flex-1 gap-8 w-full">
                        <div className="flex flex-nowrap items-center">
                            <Image src={Lightning} alt="" />
                            <h1 className="text-lg ml-4 after:content-[''] after:block after:mt-4 after:h-0.5 after:w-28 after:bg-[#ffcf00]">Memes populares</h1>
                        </div>
                        <button className="p-2 mt-2 bg-black/20 border-none outline-none font-semibold text-[#d4d4d4] border border-white/20 flex justify-center items-center rounded-lg shadow-lg text-sm" onClick={() => refreshVideos(isLoading, fetchOptions)}>
                            <Spinner isActive={isLoading} size="1.1" />
                        </button>
                    </div>
                    {videos && videos.length >= 1 ? <VideoWrapper videos={videos} /> : <VideoWrapper />}
                    {isLoading && <Spinner isActive={isLoading} size="2" />}
                </div>
            </div>
            {endReached && <Final />}
        </>
    );
}

export default Feed;
