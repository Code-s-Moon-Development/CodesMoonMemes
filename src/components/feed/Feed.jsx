import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import VideoWrapper from "./VideoWrapper";
import Spinner from "./Spinner";
import Final from "./Final";
// import useMedia from "../../hooks/useMedia";

const OuterWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InnerWrap = styled.div`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const TitleWrap = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 2rem;
    flex: 1;
    width: 100%;
    gap: 2rem;
`;

const InnerTitleWrap = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
`;

const FeedTitle = styled.h1`
    font-size: calc(1rem + 1vw);
    margin-left: 0.8rem;
    &:after {
        content: "";
        display: block;
        margin-top: 1rem;
        height: 2px;
        width: calc(100px + 1vw);
        background-color: #ffcf00;
    }
`;

const RefreshBtn = styled.div`
    padding: 0.5rem;
    font-size: calc(0.7rem + 0.3vw);
    margin: 0 0.6rem 0 0;
    background: rgba(0, 0, 0, 0.2);
    border: 0px transparent;
    outline: 0px transparent;
    font-weight: 600;
    color: #d4d4d4;
    border-radius: 8px;
    box-shadow: 0 8px 32px 0 rgba(255, 207, 0, 0.05);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Feed() {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchOptions, setFetchOptions] = useState({ limit: 15, offset: 0, sortBy: { column: "created_at", order: "desc" } });
    const [endReached, setEndReached] = useState(false);

    const [videos, setVideos] = useState([]);

    // const videoAmount = useMedia(
    //     ["(min-width: 2000px)", "(min-width: 1600px)", "(min-width: 1400px)", "(min-width: 968px)", "(min-width: 668px)", "(min-width: 0px)"],
    //     [6, 5, 4, 3, 2, 1],
    //     4
    // );

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
            <OuterWrap>
                <InnerWrap>
                    <TitleWrap>
                        <InnerTitleWrap>
                            <img src="https://img.icons8.com/color-glass/48/000000/lightning-bolt.png" alt="" />
                            <FeedTitle>Memes populares</FeedTitle>
                        </InnerTitleWrap>
                        <RefreshBtn onClick={() => refreshVideos(isLoading, fetchOptions)}>
                            <Spinner isActive={isLoading} size="1.1" />
                        </RefreshBtn>
                    </TitleWrap>
                    {videos && videos.length >= 1 ? <VideoWrapper videos={videos} /> : <VideoWrapper />}
                    {isLoading && <Spinner isActive={isLoading} size="2" />}
                </InnerWrap>
            </OuterWrap>
            {endReached && <Final />}
        </>
    );
}

export default Feed;
