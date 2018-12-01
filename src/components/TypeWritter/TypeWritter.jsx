import React, { Component } from "react";
import PropTypes from "prop-types";

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
      typed: [],
      position: 0,
      active: "idle",
      toType: [...props.lines]
    };

    this.typeNextLine = this.typeNextLine.bind(this);
  }

  typeNextLine() {
    const { position, toType, typed } = this.state;
    const { onDoneTyping } = this.props;
    if (position >= toType.length) {
      this.setState({ active: "idle" });
      return typeof onDoneTyping === "function" && onDoneTyping(typed);
    }
    this.setState({
      typed: [...typed, toType[position]],
      active: position,
      position: position + 1
    });
  }

  componentDidMount() {
    this.typeNextLine();
  }

  render() {
    const { render, speed, cursor } = this.props;
    const { typed } = this.state;

    return render(
      <div>
        {typed.map((itm, key) => (
          <div key={key}>
            <Cursor cursor={cursor && key === this.state.active}>
              <TypeWrite {...this.speeds[speed]} onDone={this.typeNextLine}>
                {`${itm}`}
              </TypeWrite>
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
  onDoneTyping: () => void 0
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
  onDoneTyping: PropTypes.func,
  /** Function as child pattern but using a prop instead  */
  render: PropTypes.func
};
