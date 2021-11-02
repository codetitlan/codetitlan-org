/**
 *
 * GenartCore
 *
 */
import React, { memo, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components/macro';

interface Props {}

const Canvas = styled.canvas``;

export const GenartCore = memo((props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;
    const context = canvas.getContext('2d');
    if (context === null) return;

    context.fillStyle = '#000000';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);
  return <Canvas ref={canvasRef} {...props}></Canvas>;
});
