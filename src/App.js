import React, { Component } from "react";
import Helmet from "react-helmet";

import TypeWritter from "./components/TypeWritter";

import "./App.css";

// A useless comment
class App extends Component {
  state = {
    appName: "Codetitlan",
    messages: ["The answer to the life the", "universe and everything", "is 42"]
  };

  render() {
    const { appName, messages } = this.state;
    return (
      <div className="App">
        <Helmet title={appName} />
        <TypeWritter speed="fast" lines={messages} cursor />
      </div>
    );
  }
}

export default App;
