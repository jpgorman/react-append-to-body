/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "./modal";

import { componentWillAppendToBody } from "../src/";

const AppendedModal = componentWillAppendToBody(Modal);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        I'm the app
        <AppendedModal>I'm rendered outside of the app </AppendedModal>
      </div>
    );
  }
}
ReactDOM.render(React.createElement(App), document.getElementById("app"));
