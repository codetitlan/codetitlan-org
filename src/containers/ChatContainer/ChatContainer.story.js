import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ChatContainer from "./ChatContainer";

storiesOf("ChatContainer", module).add("Zero config", () => <ChatContainer />);
