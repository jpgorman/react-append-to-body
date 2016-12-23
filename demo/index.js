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

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      currentModal: null,
    }
    this.handler = this.handler.bind(this)
    this.openModal = this.openModal.bind(this)
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

  render() {

    const modalMap = {
      modalA: (
        <AppendedModal>My First Model</AppendedModal>
      ),
      modalB: (
        <AppendedModal>
          My Second Modal
          <input onChange={this.handler} value={this.state.value} />
        </AppendedModal>
      ),
    }

    return (
      <div>
        Some content on my page
        <button onClick={this.openModal.bind(null, "modalA")}>Open Modal A</button>
        <button onClick={this.openModal.bind(null, "modalB")}>Open Modal B</button>
        <button onClick={this.openModal.bind(null, "close")}>Close Modal</button>
        {modalMap[this.state.currentModal] ? modalMap[this.state.currentModal] : null}
      </div>
    )
  }
}


ReactDOM.render(
  React.createElement(App),
  document.getElementById("app")
)
