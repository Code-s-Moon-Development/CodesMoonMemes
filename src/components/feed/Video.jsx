import { useRef, useEffect } from "react";
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
    width: 300px;
    height: 220px;
    min-height: 100%;
    z-index: 1;
    background: #222222;
    animation: ${placeholderBlink} 2s ease-in-out infinite;
`;

const VideoWrapper = styled.div`
    width: 300px;
    height: 220px;
    overflow: hidden;
    -webkit-transition: -webkit-transform 0.5s ease-in;
    transition: -webkit-transform 0.5s ease-in;
    -o-transition: -o-transform 0.5s ease-in;
    -moz-transition: transform 0.5s ease-in, -moz-transform 0.5s ease-in;
    transition: transform 0.5s ease-in;
    transition: transform 0.5s ease-in, -webkit-transform 0.5s ease-in, -moz-transform 0.5s ease-in, -o-transform 0.5s ease-in;
`;

const VideoEl = styled.video`
    width: 300px;
    min-height: 100%;
    width: auto;
    height: auto;
    cursor: pointer;
    position: relative;
    z-index: 1;
    &:hover {
        width: 100%;
        height: 100%;
    }
`;

function Video({ url }) {
    const videoPlayer = useRef();

    useEffect(() => {
        const video = document.getElementById("video-player");
        if (video) video.volume = 0.4;
    }, [videoPlayer]);

    return url ? (
        <>
            {url.startsWith(process.env.REACT_APP_SUPABASE_URL) ? ( // to make sure url always comes from API
                <VideoWrapper className="video-wrapper">
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
                </VideoWrapper>
            ) : null}
        </>
    ) : (
        <VideoWrapper className="video-wrapper">
            <div className="video-inner-wrapper">
                <Placeholder />
            </div>
        </VideoWrapper>
    );
}

export default Video;
