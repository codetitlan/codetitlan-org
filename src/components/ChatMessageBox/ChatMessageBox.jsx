import React from "react";
import PropTypes from "prop-types";
import TypeWrite from "../TypeWrite";

const ChatMessageBox = ({ render, conversation, typingSpeed }) =>
  render(
    conversation.map(({ source, content }, key) =>
      source === "remote" ? (
        <TypeWrite {...typingSpeed} key={key}>
          {content}
        </TypeWrite>
      ) : (
        <div key={key}>{content}</div>
      )
    )
  );

ChatMessageBox.defaultProps = {
  /** Render is identity by default */
  render: x => x,
  typingSpeed: { min: 60, max: 100 },
  conversation: []
};

ChatMessageBox.propTypes = {
  /** Function as child pattern using a prop */
  render: PropTypes.func,
  typingSpeed: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }),
  conversation: PropTypes.array
};

export default ChatMessageBox;
