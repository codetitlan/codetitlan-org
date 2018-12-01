import styled, { keyframes, css } from "styled-components";

/* eslint-disable-next-line no-unused-vars */
const cursorBlink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export default styled.div`
  position: relative;
  display: inline;
  ${({ cursor }) =>
    cursor &&
    `::after {
    animation: 1s ${css`
      cursorBlink
    `} step-end infinite;
    position: absolute;
    top: 0;
    content: "";
    right: -0.5rem;
    height: 1rem;
    width: 0.5rem;
    display: inline-block;
    vertical-align: bottom;
    background-color: #00000080;
  }`}
`;
