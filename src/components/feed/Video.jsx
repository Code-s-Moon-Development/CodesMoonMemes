import { useRef, useEffect } from "react";
import LazyLoad from "react-lazyload";
import styled, { keyframes } from "styled-components";

const placeholderBlink = keyframes`
    0% {
    background: #222222;
    }
    50% {
    background: #313131;
    }
    100% {
    background: #222222;
    }
`;

const Placeholder = styled.div`
    background: #222222;
    width: 300px;
    height: 220px;
    animation: ${placeholderBlink} 2s ease-in-out infinite;
`;

const VideoEl = styled.video`
    width: 300px;
    min-height: 100%;
`;

function Video({ url }) {
    const videoPlayer = useRef();

    useEffect(() => {
        const video = document.getElementById("video-player");
        if (video) video.volume = 0.4;
    }, [videoPlayer]);

    return url ? (
        <LazyLoad once>
            {url.startsWith(process.env.REACT_APP_SUPABASE_URL) ? ( // to make sure url always comes from API
                <div className="video-wrapper">
                    <div className="video-inner-wrapper">
                        <VideoEl
                            ref={videoPlayer}
                            key={url + "#t=0.5"} // #t=0.5 sets the video thumbnail to the first frame
                            onMouseOver={(e) => e.target.play()}
                            onMouseOut={(e) => e.target.pause()}
                            id="video-player"
                            width="300"
                            height="220"
                            controls
                            disablePictureInPicture
                            controlsList="nofullscreen nodownload noremoteplayback"
                        >
                            <source src={url + "#t=0.5"} type="video/mp4" />
                        </VideoEl>
                    </div>
                </div>
            ) : null}
        </LazyLoad>
    ) : (
        <div className="video-wrapper">
            <div className="video-inner-wrapper">
                <Placeholder />
            </div>
        </div>
    );
}

export default Video;
