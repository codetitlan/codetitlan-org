import React from "react";
import ReactDOM from "react-dom";
import TypeWritter from "./TypeWritter";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TypeWritter />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("Calls a function when done typing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TypeWritter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
