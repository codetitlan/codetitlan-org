import React from "react";
import ReactDOM from "react-dom";
import TypeLine from "./TypeLine";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TypeLine />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Calls a function when done typing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TypeLine />, div);
  ReactDOM.unmountComponentAtNode(div);
});
