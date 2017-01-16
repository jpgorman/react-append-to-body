export function addDefaultContainer() {
  if(!containerExists("#subtree-container")) {
    const container = document.createElement("div")
    container.setAttribute("id", "subtree-container")
    container.setAttribute("class", "subtree-container")
    document.body.appendChild(container)
  }
}

export function containerExists(selector) {
  return document.querySelector(selector)
}

export function removeContainer(selector) {
  const node = document.querySelector(selector)
  if (node.parentNode) {
    node.parentNode.removeChild(node)
  }
}
