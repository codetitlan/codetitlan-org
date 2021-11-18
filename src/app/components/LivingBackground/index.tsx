/**
 *
 * LivingBackground
 *
 */
import React, { memo } from 'react';
// import styled from 'styled-components/macro';
import Sketch from 'react-p5';

export enum Palettes {
  MONOCHROME = 'MONOCHROME',
  TRIAD_RED = 'TRIAD_RED',
  TRIAD_BLUE = 'TRIAD_BLUE',
}

interface Props {
  canvasHeight: number;
  canvasWidth: number;
  step: number;
  varianceFactor: number;
  palette: Palettes;
}

type Point = { x: number; y: number };
type Line = Point[];

const palettes: { [key in Palettes]: [r: number, g: number, b: number][] } = {
  [Palettes.TRIAD_RED]: [
    [238, 66, 102],
    [31, 64, 104],
    [242, 228, 181],
  ],
  [Palettes.TRIAD_BLUE]: [
    [37, 106, 220],
    [31, 64, 104],
    [169, 251, 215],
  ],
  [Palettes.MONOCHROME]: [[0, 32, 63]],
};

const makeVariantLine =
  (height: number, step: number, variance: number) =>
  (x: number): Point => ({
    x,
    y:
      step +
      ((Math.random() *
        Math.max(height / 2 - variance - Math.abs(x - height / 2), 0)) /
        2) *
        -1,
  });

const makeLines = (h: number, s: number, v: number): Line[] => {
  const steps = [...Array(Math.floor(h / s) - 1).keys()].map(x => (x + 1) * s);
  return steps.map(n => steps.flatMap(makeVariantLine(h, n, v)));
};

// export const LivingBackground = memo((props: Props) => {
export const LivingBackground = (props: Props) => {
  const { canvasHeight, canvasWidth, step, varianceFactor, palette } = props;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(canvasHeight, canvasWidth).parent(canvasParentRef);
    p5.stroke(169, 251, 215);
    p5.strokeWeight(2);
    p5.noLoop();
  };

  const draw = p5 => {
    const lines = makeLines(canvasHeight, step, varianceFactor);
    [...lines].slice(5).forEach((line, lineIdx) => {
      p5.beginShape();
      line
        .filter((x, i) => i % 2 === 0)
        .forEach((coord, idx) => {
          p5.curveVertex(coord.x, coord.y);
          p5.fill(
            ...palettes[palette][
              Math.floor(Math.random() * palettes[palette].length)
            ],
          );
        });
      p5.endShape();
    });
  };
  return <Sketch setup={setup} draw={draw} />;
  // });
};
