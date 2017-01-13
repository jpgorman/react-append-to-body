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

export function componentRegistry () {

  const registry = {}

  return class ComponentSubtreeRegistry extends React.Component {

    static get propTypes() {
      return {
        subtreeContainer: PropTypes.string,
        className: PropTypes.string,
      }
    }

    constructor(props) {
      super(props)
      this.injectSubtree = this.injectSubtree.bind(this)
      this.uniqueContainers = this.uniqueContainers.bind(this)
      this.appendToDOM = this.appendToDOM.bind(this)
      if(!props.subtreeContainer) {
        addContainer()
      }
    }

    setSubtreeId(id) {
      this.subtreeId = id
    }

    addElement(content) {
      registry[this.subtreeId] = {
        content,
        subtreeContainer: document.querySelector(this.props.subtreeContainer || "#subtree-container"),
      }
      this.renderSubtrees()
    }

    updateElement(content) {
      registry[this.subtreeId].content = content
      this.renderSubtrees()
    }

    deleteElement(key) {
      const currentElement = registry[key]
      delete registry[key]
      ReactDOM.unmountComponentAtNode(currentElement.subtreeContainer)
      this.renderSubtrees()

      if(keys(registry).length === 0){
        removeContainer()
      }
    }

    uniqueContainers() {
      return compose(
        uniq,
        map(prop("subtreeContainer"))
      )(covertToArray(registry))
    }

    appendToDOM(container, content) {
      ReactDOM.render((<span>{content}</span>), container)
    }

    injectSubtree(elementContainer) {
      compose(
        partial(this.appendToDOM, [elementContainer]),
        reduce((accum, val) => {
          accum.push(val.content)
          return accum
        }, []),
        filter(propEq("subtreeContainer", elementContainer))
      )(covertToArray(registry))
    }

    renderSubtrees() {

      map(this.injectSubtree, this.uniqueContainers())

    }
  }
}
