/**
 *
 * Cubimation
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {}

export function Cubimation(props: Props) {
  return (
    <CubeDiv>
      <CubeSideDiv side="top" />
      <CubeSideDiv side="left" />
      <CubeSideDiv side="front" />
    </CubeDiv>
  );
}

const CubeDiv = styled.div`
  background-color: white;
  width: 120px;
  height: 120px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  border-radius: 5%;
  transform: rotateX(240deg) rotateY(-5deg) rotateZ(-155deg);
`;
const CubeSideDiv = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  border-radius: 5%;
  border: 1px solid white;
  background: grey;
  ${(props: { side: string }) =>
    props.side === 'top' && 'transform: translateZ(-120px); background: blue'}
  ${(props: { side: string }) =>
    props.side === 'left' &&
    'width: 120px; transform: translateZ(-120px) rotateY(90deg); transform-origin: right; background: pink'}
  ${(props: { side: string }) =>
    props.side === 'front' &&
    'transform: rotateX(90deg); transform-origin: bottom; background: orange'}
`;
