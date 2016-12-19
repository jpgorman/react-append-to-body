import React from "react"
import ReactDOM from "react-dom"
import {keys, reduce} from "ramda"

const appendedElements = {}
const appendElementContainer = document.getElementById("append-element-container")

function getAppendedElements() {
  return reduce((accum, key) => {
    accum.push(appendedElements[key])
    return accum
  }, [], keys(appendedElements))
}

export class ManageAppendedComponents extends React.Component {

  constructor(props) {
    super(props)
  }

  setAppendElementId(id) {
    this.appendElementId = id
  }

  updateAppendElement(content) {
    appendedElements[this.appendElementId] = content
    this.renderAppendedElements()
  }

  deleteAppendElement() {
    delete appendedElements[this.appendElementId]
    this.renderAppendedElements()
  }

  renderAppendedElements() {
    ReactDOM.render((<span>{getAppendedElements()}</span>), appendElementContainer)
  }

}
