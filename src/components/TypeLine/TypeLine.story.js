import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TypeLine from "./TypeLine";

storiesOf("TypeLine", module)
  .add("Zero config", () => <TypeLine>Hello Dolly</TypeLine>)
  .add("Using a done hook", () => (
    <TypeLine onDoneTyping={action("done typing one line")}>
      😀 Hello 😎 Dolly 👍💯
    </TypeLine>
  ))
  .add("Custom renderer", () => (
    <TypeLine render={x => <h1>{x}</h1>}>A title</TypeLine>
  ));
