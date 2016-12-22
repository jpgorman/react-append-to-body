import React, {PropTypes} from "react"
import ReactDOM from "react-dom"
import {keys, reduce, map, propEq, compose, uniq, filter} from "ramda"


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
      }
    }

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

    deleteAppendElement(key) {
      const currentElement = appendedElements[key]
      delete appendedElements[key]
      ReactDOM.unmountComponentAtNode(document.querySelector(currentElement.appendElementContainer))
      this.renderAppendedElements()
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
