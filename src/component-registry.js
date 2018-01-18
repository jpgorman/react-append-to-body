export const componentRegistry = (DOMreconciler, renderer) => (
  registry = {}
) => {
  return {
    updateElement(id, element, selector) {
      if (registry.hasOwnProperty(id)) {
        console.log("update");
        registry[id].element = element;
        return renderer(registry);
      } else {
        console.log("add");
        registry[id] = { element, selector };
        return renderer(registry);
      }
    },
    deleteElement(id) {
      if (registry.hasOwnProperty(id)) {
        const currentElement = registry[id];
        delete registry[id];

        // if container exists in DOM then unmount and render new registry contents
        const container = DOMreconciler.containerExists(
          currentElement.selector
        );
        if (container) {
          DOMreconciler.unMountContainer(container);
          renderer(registry);
        }
      }
    }
  };
};
