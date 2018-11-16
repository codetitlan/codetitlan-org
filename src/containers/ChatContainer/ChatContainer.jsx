import React, { Component } from "react";
import TypeWritter from "../../components/TypeWritter";
import TypeLine from "../../components/TypeLine";

export default class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      botSpeed: "fast",
      userInput: ""
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.addToConversation = this.addToConversation.bind(this);
    this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
  }

  addToConversation(entity, lines) {
    const { conversation, botSpeed } = this.state;
    this.setState({
      conversation: [
        ...conversation,
        entity === "bot" ? (
          <TypeWritter
            cursor
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

  handleUserInput(evt) {
    this.setState({ userInput: evt.target.value });
  }

  handleNewUserMessage(evt) {
    evt.preventDefault();
    this.addToConversation("user", this.state.userInput);
    this.setState({ userInput: "", thinking: true });
    setTimeout(() => {
      this.setState({ thinking: false });
      this.addToConversation("bot", [
        "I'm singing in the rain",
        "just singing in the rain"
      ]);
    }, 1000);
  }

  componentDidMount() {
    this.addToConversation("bot", ["Hello Mr. User", "What can I do for you?"]);
  }

  render() {
    const { conversation, userInput, thinking } = this.state;
    return (
      <div>
        {conversation.map((i, k) => (
          <div key={k}>{i}</div>
        ))}
        {thinking && <div>Thinking...</div>}
        <form onSubmit={this.handleNewUserMessage}>
          <input
            type="text"
            value={userInput}
            onChange={this.handleUserInput}
          />
          <input type="submit" value="Go!" />
        </form>
      </div>
    );
  }
}
