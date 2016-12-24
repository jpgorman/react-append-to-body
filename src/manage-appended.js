import React, {PropTypes} from "react"
import ReactDOM from "react-dom"
import {keys, reduce, map, propEq, compose, uniq, filter} from "ramda"

function addContainer() {
  if(!document.querySelector("#append-element-container")) {
    const container = document.createElement("div")
    container.setAttribute("id", "append-element-container")
    container.setAttribute("class", "append-element-container")
    document.body.appendChild(container)
  }
}

function removeContainer() {
  if(document.querySelector("#append-element-container"))
    document.body.removeChild(document.querySelector("#append-element-container"))
}

export function manageAppendedComponents () {

  const appendedElements = {}

  function getAppendedElements() {
    return reduce((accum, key) => {
      accum.push(appendedElements[key])
      return accum
    }, [], keys(appendedElements))
  }

  return class ManageAppendedComponents extends React.Component {

    static get propTypes() {
      return {
        appendElementContainer: PropTypes.string,
        className: PropTypes.string,
      }
    }

    constructor(props) {
      super(props)
      if(!props.appendElementContainer) {
        addContainer()
      }
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

    deleteAppendElement(key) {
      const currentElement = appendedElements[key]
      delete appendedElements[key]
      ReactDOM.unmountComponentAtNode(document.querySelector(currentElement.appendElementContainer))
      this.renderAppendedElements()

      if(keys(appendedElements).length === 0){
        removeContainer()
      }
    }

    renderAppendedElements() {
      const elementsToAppend = getAppendedElements()
      const elementContainers = compose(
        uniq,
        map((container) => container.appendElementContainer)
      )(elementsToAppend)

      map((elementContainer) => {
        const matching = filter(propEq("appendElementContainer", elementContainer),  elementsToAppend)
        const content = reduce((accum, val) => {
          accum.push(val.content)
          return accum
        }, [], matching)
        ReactDOM.render((<span>{content}</span>), document.querySelector(elementContainer))
      }, elementContainers)

    }
  }
}
