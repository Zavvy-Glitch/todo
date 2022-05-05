import React from "react";
import ReactDOM from "react-dom/client";
import Settings from "./context/Settings.js";

import App from "./app.js";

class Main extends React.Component {
  render() {
    return (
      <Settings>
        <App />
      </Settings>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
