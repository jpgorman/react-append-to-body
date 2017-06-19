export const componentRegistry = (DOMreconciler, renderer) => (registry = {}) => {

  return {

    addElement(id, element, selector) {
      registry[id] = {
        element,
        selector,
      }
      renderer(registry)
    },

    updateElement(id, element) {
      if(registry.hasOwnProperty(id)) {
        registry[id].element = element
        renderer(registry)
      }
    },

    deleteElement(id) {
      if(registry.hasOwnProperty(id)) {
        const currentElement = registry[id]
        delete registry[id]

        // if container exists in DOM then unmount and render new registry contents
        const container = DOMreconciler.containerExists(currentElement.selector)
        if(container) {
          DOMreconciler.unMountContainer(container)
          renderer(registry)
        }
      }
    }
  }
}
