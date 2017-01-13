/* eslint-disable react/prop-types */
import React from "react"
import ReactDOM from "react-dom"
import {Modal} from "./modal"

import {
  componentWillAppendToBody
} from "../src/"

const AppendedModal = componentWillAppendToBody(Modal)

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      currentModal: null,
    }
    this.handler = this.handler.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  handler(event) {
    this.setState({
      value: event.target.value,
    })
  }

  openModal(name) {
    this.setState({
      currentModal: name
    })
  }

  closeModal() {
    this.setState({
      currentModal: null,
    })
  }

  render() {

    const modalMap = {
      modalA: (
        <AppendedModal handler={this.closeModal}>
          <div>My First Model</div>
          <button onClick={this.closeModal}>Close Modal</button>
        </AppendedModal>
      ),
      modalB: (
        <AppendedModal subtreeContainer={"#other-element-container"}>
          <div>My Second Modal</div>
          <div><input onChange={this.handler} value={this.state.value} /></div>
          <div><button onClick={this.openModal.bind(null, "close")}>Close Modal</button></div>
        </AppendedModal>
      ),
    }

    const buttons = !modalMap[this.state.currentModal] ? [
      <button key="btn1" onClick={this.openModal.bind(null, "modalA")}>Open Modal A</button>,
      <button key="btn2" onClick={this.openModal.bind(null, "modalB")}>Open Modal B</button>,
    ] : null

    return (
      <div>
        <div>Some content on my page</div>
        <div>{buttons}</div>
        {modalMap[this.state.currentModal] ? modalMap[this.state.currentModal] : null}
      </div>
    )
  }
}


ReactDOM.render(
  React.createElement(App),
  document.getElementById("app")
)
