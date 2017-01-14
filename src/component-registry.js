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

    addElement(content, container) {
      registry[this.subtreeId] = {
        content,
        subtreeContainer: container,
      }
      renderSubtree(registry)
    },

    updateElement(content) {
      registry[this.subtreeId].content = content
      renderSubtree(registry)
    },

    deleteElement(key) {
      const currentElement = registry[key]
      const containerForCurrentElement = clone(currentElement).subtreeContainer
      delete registry[key]
      ReactDOM.unmountComponentAtNode(currentElement.subtreeContainer)
      renderSubtree(registry)

      const containerHasElements = find(propEq("subtreeContainer", containerForCurrentElement))(covertToArray(registry))
      if(!containerHasElements && containerForCurrentElement.id ==="subtree-container"){
        removeDefaultContainer(containerForCurrentElement) // delete per container
      }
    }
  }
}
