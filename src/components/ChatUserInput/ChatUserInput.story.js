import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ChatUserInput from "./ChatUserInput";

storiesOf("ChatUserInput", module)
  .add("Zero config", () => <ChatUserInput />)
  .add("Handlers", () => (
    <ChatUserInput
      onSubmit={action("User submit")}
      onChange={action("input change")}
    />
  ));
