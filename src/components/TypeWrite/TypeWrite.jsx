import { Component } from "react";
import PropTypes from "prop-types";

import { later, sequentially } from "kefir";

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
        (crypto.getRandomValues(new Uint32Array(1)) / (0xffffffff + 1)) *
          (max + 1),
        10
      ) + min
    );
  }

  typeChar(c) {
    this.setState(prevState => ({
      output: prevState.output + c
    }));
  }

  componentDidMount() {
    const { children, min, max, onDone } = this.props;
    sequentially(0, [...children])
      .flatMapConcat(x => later(this.rng(min, max), x))
      .onValue(c => this.typeChar(c))
      .onEnd(_ => onDone(this.state.output));
  }

  render() {
    return this.props.render(this.state.output);
  }
}

export default TypeWrite;

TypeWrite.defaultProps = {
  children: "",
  min: 20,
  max: 50,
  render: x => x,
  onDone: () => void 0
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
  onDone: PropTypes.func,
  /** Function as child pattern but using a "render" prop instead  */
  render: PropTypes.func
};
