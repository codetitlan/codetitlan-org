import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Typewriter from 'typewriter-effect';
// import typewriter from 'typewriter-effect';

const welcomeMessage = [
  'The answer to life' +
    '\n' +
    'the universe and everything!' +
    '\n' +
    'is 42!',
];

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Typewriter
        options={{
          strings: welcomeMessage,
          autoStart: true,
          loop: true,
        }}
        onInit={tw => tw.start()}
      />

      {/* <Typewriter
        onInit={typewriter => {
          typewriter
            .typeString('is 42!')
            .callFunction(() => {
              console.log('String typed out!');
            })
            .pauseFor(2500)
            .deleteAll()
            .callFunction(() => {
              console.log('All strings were deleted');
            })
            .start();
        }}
      /> */}
    </>
  );
}
