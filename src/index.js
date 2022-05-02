import React from "react";
import ReactDOM from "react-dom";
import Settings from "./context/Settings.js";

import App from "./app.js";

class Main extends React.Component {
  render() {
      return (
        <Settings>
          <App />
        </Settings>
      )
    } 
  }

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
