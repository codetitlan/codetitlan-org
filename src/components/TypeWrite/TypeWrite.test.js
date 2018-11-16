import React from "react";
import ReactDOM from "react-dom";
import TypeWrite from "./TypeWrite";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TypeWrite />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Calls a function when done typing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TypeWrite />, div);
  ReactDOM.unmountComponentAtNode(div);
});
