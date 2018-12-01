import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TypeWrite from "./TypeWrite";

storiesOf("TypeWrite", module)
  .add("Basic usage", () => <TypeWrite>Hello dolly!</TypeWrite>)
  .add("Typing speed", () => (
    <div>
      <TypeWrite min={20} max={100}>
        This is the hare
      </TypeWrite>
      <br />
      <TypeWrite min={100} max={200}>
        This is the turtle
      </TypeWrite>
    </div>
  ))
  .add("onDone hook", () => (
    <TypeWrite onDone={action("done typing one line")}>
      😀 Hello 😎 Dolly 👍💯
    </TypeWrite>
  ))
  .add("Custom renderer", () => (
    <TypeWrite render={x => <h1>{x}</h1>}>Just typing a title</TypeWrite>
  ));
