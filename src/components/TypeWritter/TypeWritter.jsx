import React, { Component } from "react";
import PropTypes from "prop-types";
import { sequentially, fromCallback } from "kefir";
import uniqid from "uniqid";

import TypeWrite from "../TypeWrite";

import Cursor from "./StyledCursor";

class TypeWritter extends Component {
  constructor(props) {
    super(props);
    this.speeds = {
      fast: { min: 20, max: 70 },
      slow: { min: 150, max: 250 },
      normal: { min: 70, max: 150 }
    };
    this.state = {
      output: [],
      position: 0,
      active: "idle",
      toType: [...props.lines]
    };

    this.typeNextLine = this.typeNextLine.bind(this);
    this.typeLine = this.typeLine.bind(this);
  }

  typeNextLine() {
    const { position, toType, output } = this.state;
    const { onDone } = this.props;
    if (position >= toType.length) {
      this.setState({ active: "idle" });
      return typeof onDone === "function" && onDone(output);
    }
    this.setState({
      output: [...output, toType[position]],
      active: position,
      position: position + 1
    });
  }

  typeLine(line) {
    console.log("gonna do", line, "to", this.state.output);
    this.setState({ output: [...this.state.output, line] });
  }

  componentDidMount() {
    const { lines } = this.props;

    sequentially(0, lines)
      .map(x => ({ value: x }))
      .log("here goes nothing")
      .onValue(this.typeLine);
  }

  render() {
    const { render, cursor, speed } = this.props;
    const { output } = this.state;

    return render(
      <div>
        {output.map(itm => (
          <div key={uniqid()}>
            <Cursor cursor={cursor}>
              <TypeWrite {...this.speeds[speed]} onDone={itm.onDone}>{`${
                itm.value
              }`}</TypeWrite>
            </Cursor>
          </div>
        ))}
      </div>
    );
  }
}

export default TypeWritter;

TypeWritter.defaultProps = {
  lines: [],
  speed: "normal",
  cursor: false,
  /** Identity Function */
  render: x => x,
  onDone: () => void 0
};

TypeWritter.propTypes = {
  /** the text to typewrite */
  children: PropTypes.string,
  /** class names to inherit */
  className: PropTypes.string,
  /** array of lines to type on the typewritter */
  lines: PropTypes.array,
  /** speed of the typing: slow, normal, fast */
  speed: PropTypes.string,
  /** will draw a cursor if true */
  cursor: PropTypes.bool,
  /** function to execute once the text has been printed out */
  onDone: PropTypes.func,
  /** Function as child pattern but using a prop instead  */
  render: PropTypes.func
};
