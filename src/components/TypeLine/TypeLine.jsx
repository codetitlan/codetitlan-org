import { Component } from "react";
import PropTypes from "prop-types";
import { randomlyTimedForEach } from "./helpers";

import "./TypeLine.css";

/**
 * Typewrite a line of text, taking a string from `props.children`
 */
class TypeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: ""
    };
    this.typeChar = this.typeChar.bind(this);
  }

  typeChar(c) {
    this.setState(prevState => ({
      output: prevState.output + c
    }));
  }

  componentDidMount() {
    const { children, onDoneTyping, rangeMin, rangeMax } = this.props;

    randomlyTimedForEach(this.typeChar, rangeMin, rangeMax)(children).then(
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
  children: "",
  /** Render identity by default */
  render: x => x
};

TypeLine.propTypes = {
  /** the text to typewrite */
  children: PropTypes.string,
  /** minimum time in ms to wait for next char */
  rangeMin: PropTypes.number,
  /** maximum time in ms to wait for next char */
  rangeMax: PropTypes.number,
  /** function to execute once the text has been printed out */
  onDoneTyping: PropTypes.func,
  /** Function as child pattern but using a prop instead  */
  render: PropTypes.func
};
