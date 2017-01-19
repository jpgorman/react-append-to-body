/* eslint-disable react/prop-types */
import React from "react"
import ReactDOM from "react-dom"
import {Modal} from "./modal"
import {reject, append, map, addIndex, contains, __} from "ramda"

import {
  componentWillAppendToBody
} from "../src/"

const PortalA = componentWillAppendToBody(Modal)
const PortalB = componentWillAppendToBody(Modal)
const PortalC = componentWillAppendToBody(Modal)

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

  removeModal(names) {
    const modals = reject(contains(__, names), this.state.modals)
    this.setState({
      modals,
    })
  }

  render() {

    const modalMap = {
      modalA: (
        <PortalA>
          <div>My First Model</div>
          <div id="inner-modal"></div>
          <button onClick={this.removeModal.bind(null, ["modalA", "modalC"])}>Close Modal</button>
          <button key="btn3" onClick={this.addModal.bind(null, "modalC")}>Open Modal C in Modal B</button>
        </PortalA>
      ),
      modalB: (
        <PortalB subtreeContainer={"#other-element-container"}>
          <div>My Second Modal</div>
          <div><input onChange={this.handler} value={this.state.value} /></div>
          <div><button onClick={this.removeModal.bind(null, ["modalB"])}>Close Modal</button></div>
        </PortalB>
      ),
      modalC: (
        <PortalC subtreeContainer={"#inner-modal"}>
          <div>My Third Model</div>
          <button onClick={this.removeModal.bind(null, ["modalC"])}>Close Modal</button>
        </PortalC>
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
        {addIndex(map)((name, index) => <span key={index}>{modalMap[name]}</span>, this.state.modals)}
      </div>
    )
  }
}


ReactDOM.render(
  React.createElement(App),
  document.getElementById("app")
)
