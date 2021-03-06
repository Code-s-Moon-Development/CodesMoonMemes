import styled, { keyframes } from "styled-components";

const SpinA = keyframes`
 0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }`;

const LoadSpinner = styled.div`
    font-size: 10px;
    text-indent: -9999em;
    width: calc(${(props) => props.size + "rem"} + 0.5vw);
    height: calc(${(props) => props.size + "rem"} + 0.5vw);
    border-radius: 50%;
    background: ${(props) => (props.isActive ? "#ffcf00" : "#333333")};
    background: -moz-linear-gradient(left, ${(props) => (props.isActive ? "#ffcf00" : "#333333")} 10%, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, ${(props) => (props.isActive ? "#ffcf00" : "#333333")} 10%, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, ${(props) => (props.isActive ? "#ffcf00" : "#333333")} 10%, rgba(255, 255, 255, 0) 42%);
    background: -ms-linear-gradient(left, ${(props) => (props.isActive ? "#ffcf00" : "#333333")} 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, ${(props) => (props.isActive ? "#ffcf00" : "#333333")} 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    -webkit-animation: ${(props) => (props.isActive ? SpinA : "")} 1.4s infinite linear;
    animation: ${(props) => (props.isActive ? SpinA : "")} 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    &:before {
        width: 50%;
        height: 50%;
        background: ${(props) => (props.isActive ? "#ffcf00" : "#333333")};
        border-radius: 100% 0 0 0;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
    }
    &:after {
        background: #131313;
        width: 75%;
        height: 75%;
        border-radius: 50%;
        content: "";
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
`;

const RefreshSvg = styled.svg`
    width: calc(${(props) => props.size + "rem"} + 0.5vw);
    height: calc(${(props) => props.size + "rem"} + 0.5vw);
`;

function Spinner({ isActive, size }) {
    return (
        <>
            {isActive ? (
                <LoadSpinner isActive={isActive} size={size} />
            ) : (
                <>
                    <RefreshSvg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" size={size} viewBox="0 0 172 172" style={{ fill: "#000000" }}>
                        <g transform="translate(25.8,25.8) scale(0.7,0.7)">
                            <g style={{ mixBlendMode: "normal" }}>
                                <path d="M0,172v-172h172v172z" fill="none"></path>
                                <g fill="#838383">
                                    <path d="M157.66667,78.83333c-3.95804,0 -7.16667,3.20863 -7.16667,7.16667c0.05816,29.20812 -19.48095,54.82504 -47.66501,62.49162c-28.18406,7.66658 -58.0072,-4.5229 -72.75257,-29.73583c-14.74536,-25.21293 -10.74761,-57.182 9.75238,-77.98748c20.49999,-20.80548 52.40643,-25.27564 77.8347,-10.90481l-8.06967,8.06967c-2.04901,2.04963 -2.66186,5.1316 -1.55286,7.80919c1.109,2.6776 3.72152,4.42369 6.61969,4.42431h28.66667c0.29245,-0.03866 0.5821,-0.09612 0.86717,-0.172c0.45438,-0.04785 0.90315,-0.13904 1.34017,-0.27233c0.48437,-0.16709 0.94836,-0.38826 1.38317,-0.65933c0.24487,-0.09908 0.48412,-0.21152 0.71667,-0.33683c0.129,-0.10033 0.18633,-0.25083 0.31533,-0.35833c0.37375,-0.3428 0.71227,-0.72213 1.0105,-1.13233c0.26741,-0.33089 0.50711,-0.68325 0.71667,-1.0535c0.18723,-0.40985 0.33366,-0.83713 0.43717,-1.27567c0.14956,-0.46537 0.24573,-0.94624 0.28667,-1.43333c0,-0.16483 0.10033,-0.30817 0.10033,-0.48017v-28.6595c-0.00062,-2.89817 -1.74671,-5.51069 -4.42431,-6.61969c-2.6776,-1.109 -5.75957,-0.49615 -7.80919,1.55286l-10.11217,10.0835c-30.3979,-19.24021 -69.96532,-15.46069 -96.17108,9.18634c-26.20575,24.64703 -32.40151,63.9087 -15.05916,95.42791c17.34234,31.51921 53.82309,47.29963 88.66869,38.35529c34.84561,-8.94435 59.21585,-40.3443 59.23338,-76.31954c0,-3.95804 -3.20863,-7.16667 -7.16667,-7.16667z"></path>
                                </g>
                            </g>
                        </g>
                    </RefreshSvg>
                </>
            )}
        </>
    );
}

export default Spinner;
