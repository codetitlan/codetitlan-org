import React from 'react';
import logo from './logo.svg';
import './App.css';

import Typewriter from 'typewriter-effect';

function App() {
  return (
    <>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString('Hello World!')
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
      />
    </>
  );
}

export default App;
