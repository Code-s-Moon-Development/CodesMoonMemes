"use client";

import type { ReactNode } from "react";
import { Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import type { IVideoParams } from "../../types";
import Video from "../Video/Video";

interface IPopularFeedProps {
    popularVideosData: IVideoParams[];
    children: ReactNode;
}

const breakpoints = {
    320: {
        slidesPerView: 1,
        spaceBetween: 10,
    },
    640: {
        slidesPerView: 1,
    },
    768: {
        slidesPerView: 2,
    },
    1024: {
        slidesPerView: 3,
    },
    1400: {
        slidesPerView: 6,
    },
};

export default function Popular({ popularVideosData, children }: IPopularFeedProps) {
    return (
        <div className="relative w-full py-8">
            <Swiper
                modules={[Navigation, Mousewheel]}
                navigation={{
                    disabledClass: "opacity-0",
                }}
                mousewheel={{ sensitivity: 3 }}
                grabCursor
                className="size-full relative mr-32 h-fit"
                breakpoints={breakpoints}
                noSwipingSelector="input"
            >
                <>
                    <SwiperSlide className="md:mr-48 md:pl-16">{children}</SwiperSlide>
                    {popularVideosData.map((video, i) => (
                        <SwiperSlide key={i} className="relative px-4 md:px-0">
                            <Video video={video} grow frameSize="xs:w-72 sm:w-80 md:w-96" />
                        </SwiperSlide>
                    ))}
                </>
            </Swiper>
        </div>
    );
}
