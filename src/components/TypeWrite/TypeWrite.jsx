import { Component } from "react";
import PropTypes from "prop-types";
import { later } from "kefir";

import "./TypeWrite.css";

class TypeWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: ""
    };
  }

  rng(min, max) {
    return (
      parseInt(
        (crypto.getRandomValues(new Uint32Array(1)) / (0xffffffff + 1)) * max +
          1,
        10
      ) + min
    );
  }

  componentDidMount() {
    const { children, min, max } = this.props;
    const textArray = [...children];

    textArray.reduce(
      (x, ac) =>
        later(this.rng(min, max), x).onValue(v =>
          this.setState(ps => ({ output: ps.output + v }))
        ),
      later(0, this.state.output)
    );

    // sequentially(100, textArray).onValue(v =>
    //   this.setState({ output: this.state.output + v })
    // );

    // const stream$ = sequentially(0, textArray).map(x => x);
  }

  render() {
    return this.props.render(this.state.output);
  }
}

export default TypeWrite;

TypeWrite.defaultProps = {
  children: "",
  min: 10,
  max: 10,
  render: x => x,
  onDoneTyping: () => void 0
};

TypeWrite.propTypes = {
  /** the text to typewrite */
  children: PropTypes.string,
  /** class names to inherit */
  lines: PropTypes.array,
  /** min speed of the typingin ms */
  min: PropTypes.number,
  /** max speed of the typingin ms */
  max: PropTypes.number,
  /** function to execute once the text has been printed out */
  onDoneTyping: PropTypes.func,
  /** Function as child pattern but using a "render" prop instead  */
  render: PropTypes.func
};
