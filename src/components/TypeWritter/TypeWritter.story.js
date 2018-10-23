import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TypeWritter from "./TypeWritter";

const someLines = [
  "Banksy gastropub Marfa 90's mlkshk DIY PBR food",
  "truck 3 wolf moon plaid cray organic hashtag meh flannel",
  "chambray Brooklyn gluten-free pug next level freegan leggings Tumblr",
  "brunch deep v Cosby sweater actually church-key aesthetic authentic Pitchfork",
  "salvia cred try-hard bespoke fixie Vice letterpress distillery hoodie",
  "Pinterest Williamsburg butcher shabby chic pour-over chillwave selfies"
];

storiesOf("TypeWritter", module)
  .add("Basic usage", () => (
    <TypeWritter lines={["Hello", "Hello !!", "Hello Dolly"]} />
  ))
  .add("Change speed", () => (
    <div>
      <TypeWritter
        speed="fast"
        lines={["This text will be typed at", "a fast rate"]}
      />
      <hr />
      <TypeWritter
        speed="normal"
        lines={["This text will be typed at", "a normal rate"]}
      />
      <hr />
      <TypeWritter
        speed="slow"
        lines={["This text will be typed at", "a slow rate"]}
      />
    </div>
  ))
  .add("Long text", () => <TypeWritter lines={someLines} />)
  .add("With Cursor", () => (
    <TypeWritter speed="fast" lines={someLines} cursor />
  ))
  .add("On done typing", () => (
    <TypeWritter
      onDoneTyping={action("done typing lines")}
      lines={["I will do something", "once I am done", "writting this"]}
    />
  ));
