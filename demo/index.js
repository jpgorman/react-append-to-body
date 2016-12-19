import React from "react"
import ReactDOM from "react-dom"

export function Modal({children}) {
  return (
    <div className="modal__container">
      {children}
    </div>
  )
}

import {
  componentWillAppendToBody
} from "../src/append-to-body"

const AppendedModal = componentWillAppendToBody(Modal)

const App = function() {
  return (
    <div>
      Some content on my page
      <AppendedModal>My Model</AppendedModal>
    </div>
  )
}


ReactDOM.render(
  React.createElement(App),
  document.getElementById("app")
)
