/* eslint-disable react/prop-types */
import React from "react"
import ReactDOM from "react-dom"
import {Modal} from "./modal"
import {reject, equals, append, map} from "ramda"

import {
  componentWillAppendToBody
} from "../src/"

const AppendedModalA = componentWillAppendToBody(Modal)
const AppendedModalB = componentWillAppendToBody(Modal)
const AppendedModalC = componentWillAppendToBody(Modal)

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      modals: [],
    }
    this.handler = this.handler.bind(this)
    this.addModal = this.addModal.bind(this)
    this.removeModal = this.removeModal.bind(this)
  }

  handler(event) {
    this.setState({
      value: event.target.value,
    })
  }

  addModal(name) {
    const modals = append(name, this.state.modals)
    this.setState({
      modals,
    })
  }

  removeModal(name) {
    console.log("remove", name)
    const modals = reject(equals(name), this.state.modals)
    this.setState({
      modals,
    })
  }

  render() {

    const modalMap = {
      modalA: (
        <AppendedModalA>
          <div>My First Model</div>
          <div id="inner-modal"></div>
          <button onClick={this.removeModal.bind(null, "modalA")}>Close Modal</button>
          <button key="btn3" onClick={this.addModal.bind(null, "modalC")}>Open Modal C in Modal B</button>
        </AppendedModalA>
      ),
      modalB: (
        <AppendedModalB subtreeContainer={"#other-element-container"}>
          <div>My Second Modal</div>
          <div><input onChange={this.handler} value={this.state.value} /></div>
          <div><button onClick={this.removeModal.bind(null, "modalB")}>Close Modal</button></div>
        </AppendedModalB>
      ),
      modalC: (
        <AppendedModalC subtreeContainer={"#inner-modal"}>
          <div>My Third Model</div>
          <button onClick={this.removeModal.bind(null, "modalC")}>Close Modal</button>
        </AppendedModalC>
      ),
    }

    const buttons = [
      <button key="btn1" onClick={this.addModal.bind(null, "modalA")}>Open Modal A</button>,
      <button key="btn2" onClick={this.addModal.bind(null, "modalB")}>Open Modal B</button>,
    ]

    return (
      <div>
        <div>Some content on my page</div>
        <div>{buttons}</div>
        {map((name) => modalMap[name], this.state.modals)}
      </div>
    )
  }
}


ReactDOM.render(
  React.createElement(App),
  document.getElementById("app")
)
