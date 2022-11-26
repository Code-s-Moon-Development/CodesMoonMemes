"use client"

import Video from "./Video";

function VideoWrapper({ videos }) {
    return (
            <section className="m-2 gap-1 flex flex-wrap justify-center items-center">
                {
                    videos?.length >= 1
                        ? videos.map((video, i) => <Video key={i} url={video.url} />)
                        : [...Array(25)].map((e, i) => <Video key={i} />) /* Insert placeholder videos */
                }
            </section>
    );
}

export default VideoWrapper;
