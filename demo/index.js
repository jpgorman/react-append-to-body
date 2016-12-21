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
} from "../src/"

const AppendedModal = componentWillAppendToBody(Modal)
const AppendeOtherModal = componentWillAppendToBody(Modal)
const AppendeAnOtherModal = componentWillAppendToBody(Modal)

const App = function() {
  return (
    <div>
      Some content on my page
      <AppendedModal appendElementContainer={"#other-element-container"}>My First Model</AppendedModal>
      <AppendedModal>My Second Model</AppendedModal>
      <AppendeAnOtherModal>My Third Model</AppendeAnOtherModal>
      <AppendeAnOtherModal appendElementContainer={"#other-element-container"}>My Fourth Model</AppendeAnOtherModal>
    </div>
  )
}


ReactDOM.render(
  React.createElement(App),
  document.getElementById("app")
)
