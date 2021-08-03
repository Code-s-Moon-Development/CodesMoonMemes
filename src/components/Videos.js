import LazyLoad from "react-lazyload";

function Videos(props) {
    return (
        <LazyLoad once>
            <div className="video-wrapper">
                <div className="video-inner-wrapper">
                    <video
                        key={props.url}
                        onMouseOver={(e) => e.target.play()}
                        onMouseOut={(e) => e.target.pause()}
                        width="300"
                        height="220"
                        controls
                        disablePictureInPicture
                        controlsList="nofullscreen nodownload noremoteplayback"
                    >
                        <source src={props.url} type="video/mp4" />
                    </video>
                </div>
            </div>
        </LazyLoad>
    );
}

export default Videos;
