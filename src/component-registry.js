import ReactDOM from "react-dom"
import {keys, reduce, find, propEq} from "ramda"
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
        delete registry[id]

        // if container exists in DOM then unmount and render new registry contents
        const container = containerExists(currentElement.selector)
        if(container) {
          ReactDOM.unmountComponentAtNode(container)
          renderSubtree(registry)
        }
      }
    }
  }
}
