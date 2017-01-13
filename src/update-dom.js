export function addContainer() {
  if(!document.querySelector("#subtree-container")) {
    const container = document.createElement("div")
    container.setAttribute("id", "subtree-container")
    container.setAttribute("class", "subtree-container")
    document.body.appendChild(container)
  }
}

export function removeContainer() {
  if(document.querySelector("#subtree-container"))
    document.body.removeChild(document.querySelector("#subtree-container"))
}
