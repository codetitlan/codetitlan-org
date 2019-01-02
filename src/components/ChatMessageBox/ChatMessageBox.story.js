import React from "react";
import { storiesOf } from "@storybook/react";

import ChatMessageBox from "./ChatMessageBox";

const mockConversation = [
  {
    source: "remote",
    content: "Hello Mr. User",
    timestamp: new Date()
  },
  {
    source: "local",
    content: "Hello little bot",
    timestamp: new Date()
  }
];

storiesOf("ChatMessageBox", module).add("Zero config", () => (
  <ChatMessageBox conversation={mockConversation} />
));

setTimeout(
  () =>
    mockConversation.push({
      source: "remote",
      content: "Round One",
      timestamp: new Date()
    }),
  3000
);
