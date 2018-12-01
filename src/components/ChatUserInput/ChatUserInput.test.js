import React from "react";
import ReactDOM from "react-dom";
import ChatUserInput from "./ChatUserInput";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ChatUserInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});
