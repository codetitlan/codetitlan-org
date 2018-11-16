import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TypeWrite from "./TypeWrite";

const someLines = [
  "Banksy gastropub Marfa 90's mlkshk DIY PBR food",
  "truck 3 wolf moon plaid cray organic hashtag meh flannel",
  "chambray Brooklyn gluten-free pug next level freegan leggings Tumblr",
  "brunch deep v Cosby sweater actually church-key aesthetic authentic Pitchfork",
  "salvia cred try-hard bespoke fixie Vice letterpress distillery hoodie",
  "Pinterest Williamsburg butcher shabby chic pour-over chillwave selfies"
];

storiesOf("TypeWrite", module).add("Basic usage", () => (
  <TypeWrite>This is the basic usage</TypeWrite>
));
