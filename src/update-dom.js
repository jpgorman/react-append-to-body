export function addContainer() {
  if(!document.querySelector("#append-element-container")) {
    const container = document.createElement("div")
    container.setAttribute("id", "append-element-container")
    container.setAttribute("class", "append-element-container")
    document.body.appendChild(container)
  }
}

export function removeContainer() {
  if(document.querySelector("#append-element-container"))
    document.body.removeChild(document.querySelector("#append-element-container"))
}
