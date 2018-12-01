import React from "react";
import PropTypes from "prop-types";
import TypeWrite from "../TypeWrite";

const ChatMessageBox = ({ render, conversation }) =>
  render(
    conversation.map(({ source, content }, key) =>
      source === "remote" ? (
        <TypeWrite key={key}>content</TypeWrite>
      ) : (
        <div key={key}>content</div>
      )
    )
  );

ChatMessageBox.defaultProps = {
  /** Render is identity by default */
  render: x => x,
  conversation: []
};

ChatMessageBox.propTypes = {
  /** Function as child pattern using a prop */
  render: PropTypes.func,
  conversation: PropTypes.array
};

export default ChatMessageBox;
