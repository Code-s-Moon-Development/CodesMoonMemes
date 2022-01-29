import styled from "styled-components";
import Video from "./Video";
import LazyLoad from "react-lazyload";

const VideoGrid = styled.section`
    margin: 0.5rem 0.2rem;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

function VideoWrapper({ videos }) {
    return (
        <LazyLoad once>
            <VideoGrid>
                {
                    videos && videos.length >= 1
                        ? videos.map((video, i) => <Video key={i} url={video.url} />)
                        : [...Array(25)].map((e, i) => <Video key={i} />) /* Insert placeholder videos */
                }
            </VideoGrid>
        </LazyLoad>
    );
}

export default VideoWrapper;
