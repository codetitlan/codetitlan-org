import React, { Component } from "react";
import TypeWritter from "../../components/TypeWritter";
import ChatUserInput from "../../components/ChatUserInput";

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      botSpeed: "fast"
    };

    this.addToConversation = this.addToConversation.bind(this);
    this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
  }

  addToConversation(source, lines) {
    const { conversation, botSpeed } = this.state;
    this.setState({
      conversation: [
        ...conversation,
        source === "remote" ? (
          <TypeWritter
            cursor={true}
            className="ChatContainer_botMessage"
            speed={botSpeed}
            lines={lines}
          />
        ) : (
          <div className="ChatContainer_userMessage">{lines}</div>
        )
      ]
    });
  }

  handleNewUserMessage(input) {
    this.addToConversation("user", input);
    this.setState({ thinking: true });
    setTimeout(() => {
      this.setState({ thinking: false });
      this.addToConversation("remote", [
        "I'm singing in the rain",
        "just singing in the rain"
      ]);
    }, 1000);
  }

  componentDidMount() {
    this.addToConversation("remote", [
      "Hello Mr. User",
      "What can I do for you?"
    ]);
  }

  render() {
    const { conversation, thinking } = this.state;
    return (
      <div>
        {conversation.map((i, k) => (
          <div key={k}>{i}</div>
        ))}
        {thinking && <div>Thinking...</div>}
        <ChatUserInput onSubmit={this.handleNewUserMessage} />
      </div>
    );
  }
}
