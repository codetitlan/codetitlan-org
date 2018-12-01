import React from "react";
import ReactDOM from "react-dom";
import ChatMessageBox from "./ChatMessageBox";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ChatMessageBox />, div);
  ReactDOM.unmountComponentAtNode(div);
});
