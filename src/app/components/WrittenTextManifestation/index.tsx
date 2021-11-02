/**
 * WrittenTextManifestation
 *
 */
import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
// import styled from 'styled-components/macro';

type Stack = {
  queue: string[];
  done: string[];
};

export interface WrittenTextManifestationProps {
  /** An array with strings to be typed line by line */
  dialogue: string[];
  /** _Optional:_ Range of time in `ms` for a pause between lines */
  interlinePause?: number;
  /** _Optional:_ Time in `ms` to wait to type the next character or `'natural'` */
  typingDelay?: number | 'natural';
  /** _Optional:_ Repeat the dialogue in an eternal loop (will ignore onDone) */
  loop?: boolean;
  /** _Optional:_ Callback function to be called when done typing all lines` */
  onDone?: (...x: any) => unknown;
}

const step = ({ queue: [qHead, ...qTail], done }: Stack): Stack => ({
  queue: [...qTail],
  done: [...done, qHead],
});

const randomizePause = range => Math.ceil(500 + Math.random() * range);

/**
 * Types strings from an array simulating natural typing.
 */
export function WrittenTextManifestation({
  dialogue: [firstString, ...restOfDialogue] = [],
  interlinePause = 500,
  typingDelay = 'natural',
  onDone = x => x,
}: WrittenTextManifestationProps) {
  // useEffect(() => {
  //   return () => {
  //     console.log('Cleanup yoloman', restOfDialogue.length);
  //   };
  // });
  const provisionedStack = {
    queue: [...restOfDialogue],
    done: [firstString],
  };

  const [stack, setStack] = useState<Stack>(provisionedStack);

  return (
    <>
      {stack.done.map((content, i) => (
        <Typewriter
          key={`stringTyped-${i}`}
          options={{ delay: typingDelay }}
          onInit={tw =>
            tw
              .typeString(content)
              .pauseFor(randomizePause(interlinePause))
              .callFunction(({ elements: { cursor } }) =>
                cursor.setAttribute('hidden', 'true'),
              )
              .callFunction(_ =>
                stack.queue.length > 0
                  ? setStack(step(stack))
                  : onDone({ ...stack }),
              )
              .start()
          }
        />
      ))}
    </>
  );
}
