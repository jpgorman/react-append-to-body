import ReactDOM from "react-dom"
import {keys, reduce, find, propEq, clone} from "ramda"
import {removeDefaultContainer, containerExists} from "./update-dom"
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

    addElement(id, element, selector) {
      registry[id] = {
        element,
        subtreeContainer: document.querySelector(selector),
        selector,
      }
      renderSubtree(registry)
    },

    updateElement(id, element) {
      if(registry.hasOwnProperty(id)) {
        registry[id].element = element
        renderSubtree(registry)
      }
    },

    deleteElement(id) {
      if(registry.hasOwnProperty(id)) {
        const currentElement = registry[id]
        const currentElementClone = clone(currentElement)
        delete registry[id]

        // if container exists in DOM then unmount and render new registry contents
        const container = containerExists(currentElementClone.selector)
        if(container) {
          ReactDOM.unmountComponentAtNode(container)
          renderSubtree(registry)
        }

        // if no elements exist in registry for container, if it is the default container, remove from DOM
        const containerHasElements = find(propEq("selector", currentElementClone.selector))(covertToArray(registry))
        if(!containerHasElements && currentElementClone.selector ==="#subtree-container"){
          removeDefaultContainer()
        }
      }
    }
  }
}
