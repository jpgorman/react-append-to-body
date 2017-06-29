/* eslint-disable react/prop-types */
import React from "react"
import ReactDOM from "react-dom"
import {Modal} from "./modal"

import filter from "ramda/src/filter"
import append from "ramda/src/append"
import map from "ramda/src/map"
import contains from "ramda/src/contains"

function addIndex(functor){
  return function(fn, ...rest) {
    let cnt = 0
    const newFn = (args) => fn.apply(null, [args, cnt++])
    return functor.apply(null, [newFn, ...rest])
  }
}

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
    const modals = filter((name) => !contains(name, names), this.state.modals)
    this.setState({
      modals,
    })
  }

  render() {

    const modalMap = {
      modalA: (
        <PortalA>
          <div>My First App</div>
          <div id="inner-modal"></div>
          <div className="controls">
            <button onClick={this.removeModal.bind(null, ["modalA", "modalC"])}>Close App</button>
            <button key="btn3" onClick={this.addModal.bind(null, "modalC")}>Open App C in App A</button>
          </div>
        </PortalA>
      ),
      modalB: (
        <PortalB subtreeContainer={"#other-element-container"}>
          <div>My Second App</div>
          <div><input onChange={this.handler} value={this.state.value} /></div>
          <div><button onClick={this.removeModal.bind(null, ["modalB"])}>Close App</button></div>
        </PortalB>
      ),
      modalC: (
        <PortalC subtreeContainer={"#inner-modal"}>
          <div>My Third App</div>
          <button onClick={this.removeModal.bind(null, ["modalC"])}>Close App</button>
        </PortalC>
      ),
    }

    const buttons = [
      <button key="btn1" onClick={this.addModal.bind(null, "modalA")}>Open App A</button>,
      <button key="btn2" onClick={this.addModal.bind(null, "modalB")}>Open App B</button>,
    ]

    return (
      <div>
        <div>This is my main app</div>
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
