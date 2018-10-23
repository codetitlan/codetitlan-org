import { Component } from "react";
import PropTypes from "prop-types";
import { randomlyTimedForEach } from "./helpers";

import "./TypeLine.css";

/**
 * Typewritte a line of text, taking a string from `props.children`
 */
class TypeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: ""
    };
  }

  componentDidMount() {
    const { children, onDoneTyping, rangeMin, rangeMax } = this.props;

    const timedType = randomlyTimedForEach(
      nextChar => this.setState({ output: this.state.output + nextChar }),
      rangeMin,
      rangeMax
    );

    timedType(children || []).then(
      res => typeof onDoneTyping === "function" && onDoneTyping(res)
    );
  }

  render() {
    const { render } = this.props;
    return render(this.state.output);
  }
}

export default TypeLine;

TypeLine.defaultProps = {
  rangeMin: 70,
  rangeMax: 250,
  /** Identity Function */
  render: x => x
};

TypeLine.propTypes = {
  /** the text to typewrite */
  children: PropTypes.string,
  /** class names to inherit */
  className: PropTypes.string,
  /** minimum time in ms to wait for next char */
  rangeMin: PropTypes.number,
  /** maximum time in ms to wait for next char */
  rangeMax: PropTypes.number,
  /** function to execute once the text has been printed out */
  onDoneTyping: PropTypes.func,
  /** Function as child pattern but using a prop instead  */
  render: PropTypes.func
};
