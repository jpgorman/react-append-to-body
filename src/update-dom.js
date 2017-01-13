export function addDefaultContainer() {
  if(!document.querySelector("#subtree-container")) {
    const container = document.createElement("div")
    container.setAttribute("id", "subtree-container")
    container.setAttribute("class", "subtree-container")
    document.body.appendChild(container)
  }
}

export function removeDefaultContainer() {
  if(document.querySelector("#subtree-container"))
    document.body.removeChild(document.querySelector("#subtree-container"))
}
