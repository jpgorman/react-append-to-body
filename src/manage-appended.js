import React, {PropTypes} from "react"
import ReactDOM from "react-dom"
import {keys, reduce, map, propEq, prop, compose, uniq, filter, partial} from "ramda"
import {addContainer, removeContainer} from "./update-dom"

function covertToArray(collection) {
  return reduce((accum, key) => {
    accum.push(collection[key])
    return accum
  }, [], keys(collection))
}

export function manageAppendedComponents () {

  const appendedElements = {}

  return class ManageAppendedComponents extends React.Component {

    static get propTypes() {
      return {
        appendElementContainer: PropTypes.string,
        className: PropTypes.string,
      }
    }

    constructor(props) {
      super(props)
      this.appendToEachContainer = this.appendToEachContainer.bind(this)
      this.uniqueListOfContainers = this.uniqueListOfContainers.bind(this)
      this.appendToDOM = this.appendToDOM.bind(this)
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

    uniqueListOfContainers() {
      return compose(
        uniq,
        map(prop("appendElementContainer"))
      )(covertToArray(appendedElements))
    }

    appendToDOM(container, content) {
      ReactDOM.render((<span>{content}</span>), document.querySelector(container))
    }

    appendToEachContainer(elementContainer) {
      compose(
        partial(this.appendToDOM, [elementContainer]),
        reduce((accum, val) => {
          accum.push(val.content)
          return accum
        }, []),
        filter(propEq("appendElementContainer", elementContainer))
      )(covertToArray(appendedElements))
    }

    renderAppendedElements() {

      map(this.appendToEachContainer, this.uniqueListOfContainers())

    }
  }
}
