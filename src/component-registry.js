import ReactDOM from "react-dom"
import {keys, reduce, find, propEq, clone} from "ramda"
import {removeDefaultContainer} from "./update-dom"
import {renderSubtree} from "./render-subtree"

function covertToArray(collection) {
  return reduce((accum, key) => {
    accum.push(collection[key])
    return accum
  }, [], keys(collection))
}

export function componentRegistry () {

  const registry = {}

  return {
    setSubtreeId(id) {
      this.subtreeId = id
    },

    addElement(content, selector) {
      registry[this.subtreeId] = {
        content,
        subtreeContainer: document.querySelector(selector),
        selector,
      }
      renderSubtree(registry)
    },

    updateElement(content) {
      if(registry.hasOwnProperty(this.subtreeId)) {
        registry[this.subtreeId].content = content
        renderSubtree(registry)
      }
    },

    deleteElement(key) {
      const currentElement = registry[key]
      const currentElementClone = clone(currentElement)
      delete registry[key]
      ReactDOM.unmountComponentAtNode(currentElementClone.subtreeContainer)
      renderSubtree(registry)

      const containerHasElements = find(propEq("selector", currentElementClone.selector))(covertToArray(registry))
      if(!containerHasElements && currentElementClone.selector ==="#subtree-container"){
        removeDefaultContainer() // delete per container
      }
    }
  }
}
