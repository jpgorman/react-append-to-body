import React from "react"
import ReactDOM from "react-dom"
import {keys, reduce, map, find, propEq, prop, compose, uniq, filter} from "ramda"

const appendedElements = {}

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
    appendedElements[this.appendElementId] = {
      content,
      appendElementContainer: this.props.appendElementContainer || "#append-element-container",
    }
    this.renderAppendedElements()
  }

  deleteAppendElement() {
    delete appendedElements[this.appendElementId]
    this.renderAppendedElements()
  }

  renderAppendedElements() {
    const elementsToAppend = getAppendedElements()
    const elementContainers = compose(
      uniq,
      map((container) => container.appendElementContainer),
    )(elementsToAppend)

    map((elementContainer) => {
      const matching = filter(propEq("appendElementContainer", elementContainer),  elementsToAppend)
      const content = reduce((accum, val) => {
        accum.push(val.content)
        return accum
      }, [], matching)
      console.log(elementContainer)
      ReactDOM.render((<span>{content}</span>), document.querySelector(elementContainer))
    }, elementContainers)

  }

}
