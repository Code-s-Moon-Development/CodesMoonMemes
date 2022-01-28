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
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 2rem;
    font-size: 10px;
    text-indent: -9999em;
    width: 6em;
    height: 6em;
    border-radius: 50%;
    background: #ffcf00;
    background: -moz-linear-gradient(left, #ffcf00 10%, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, #ffcf00 10%, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, #ffcf00 10%, rgba(255, 255, 255, 0) 42%);
    background: -ms-linear-gradient(left, #ffcf00 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, #ffcf00 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    -webkit-animation: ${SpinA} 1.4s infinite linear;
    animation: ${SpinA} 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    &:before {
        width: 50%;
        height: 50%;
        background: #ffcf00;
        border-radius: 100% 0 0 0;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
    }
    &:after {
        background: #181818;
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

function Spinner() {
    return <LoadSpinner />;
}

export default Spinner;