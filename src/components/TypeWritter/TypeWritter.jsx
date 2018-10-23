import React, { Component } from "react";
import PropTypes from "prop-types";

import TypeLine from "../TypeLine";

import "./TypeWritter.css";

class TypeWritter extends Component {
  constructor(props) {
    super(props);
    this.speeds = {
      fast: { rangeMin: 20, rangeMax: 70 },
      slow: { rangeMin: 150, rangeMax: 250 },
      normal: { rangeMin: 70, rangeMax: 150 }
    };
    this.state = {
      typed: [],
      position: 0,
      toType: [...props.lines]
    };
  }

  typeNextLine() {
    const { position, toType, typed } = this.state;
    const { onDoneTyping } = this.props;
    if (position >= toType.length)
      return typeof onDoneTyping === "function" && onDoneTyping(typed);

    this.setState({
      typed: [...typed, toType[position]],
      active: position,
      position: position + 1
    });
  }

  componentDidMount() {
    this.typeNextLine.bind(this)();
  }

  render() {
    const { render, speed, cursor } = this.props;
    const { typed, active } = this.state;

    return render(
      <div>
        {typed.map((x, k) => (
          <div
            key={k}
            className={`typeWritterLine ${active ? "typingNow" : ""} ${
              cursor && k === active ? "withCursor cursorBlinks" : ""
            }`}
          >
            <TypeLine
              {...this.speeds[speed]}
              onDoneTyping={this.typeNextLine.bind(this)}
            >
              {x}
            </TypeLine>
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
  render: x => x
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
