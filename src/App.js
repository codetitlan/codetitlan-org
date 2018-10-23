import React, { Component } from "react";
import Helmet from "react-helmet";

import TypeWritter from "./components/TypeWritter";

import "./App.css";

// A useless comment
class App extends Component {
  state = {
    appName: "Codetitlan",
    welcomeMessage: "Welcome to this thing",
    messages: ["The answer to the life the", "universe and everything", "is 42"]
  };

  render() {
    const { appName, welcomeMessage, messages } = this.state;
    return (
      <div className="App">
        <Helmet title={appName} />
        <header className="App-header">
          <h1 className="App-title">{welcomeMessage}</h1>
        </header>
        <TypeWritter speed="normal" lines={messages} cursor />
      </div>
    );
  }
}

export default App;
