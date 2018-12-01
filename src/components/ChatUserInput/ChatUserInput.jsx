import React, { Component } from "react";
import PropTypes from "prop-types";

class ChatUserInput extends Component {
  state = { inputValue: "" };

  render() {
    const { inputValue } = this.state;
    const { onChange, onSubmit } = this.props;
    return (
      <div>
        <form
          onSubmit={evt => {
            evt.preventDefault();
            onSubmit(this.state.inputValue);
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={evt => {
              const { value } = evt.target;
              this.setState({ inputValue: value });
              onChange(value);
            }}
          />
          <input type="submit" value="➜" />
        </form>
      </div>
    );
  }
}

ChatUserInput.defaultProps = {
  /** Render identity by default */
  render: x => x,
  /** Render identity by default */
  onChange: x => x,
  /** Render identity by default */
  onSubmit: x => x
};

ChatUserInput.propTypes = {
  /** render override */
  render: PropTypes.func,
  /** function to execute on input change */
  onChange: PropTypes.func,
  /** function to execute on user submit */
  onSubmit: PropTypes.func
};

export default ChatUserInput;
