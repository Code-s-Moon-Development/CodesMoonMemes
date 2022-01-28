import styled from "styled-components";
import Video from "./Video";

const VidRow = styled.section`
    margin: 1rem 2.5rem;
`;

const InnerVidRowWrap = styled.div`
    margin: 0.5rem 0;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

function VideoWrapper({ videos, videoAmount }) {
    return (
        <>
            <VidRow>
                <InnerVidRowWrap>
                    {
                        videos && videos.length >= 1
                            ? videos.slice(0, videoAmount).map((video, i) => <Video key={i} url={video.url} />)
                            : [...Array(videoAmount)].map((e, i) => <Video key={i} />) /* Insert placeholder videos */
                    }
                </InnerVidRowWrap>
            </VidRow>
        </>
    );
}

export default VideoWrapper;
