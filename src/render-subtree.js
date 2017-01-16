import React from "react"
import ReactDOM from "react-dom"
import {containerExists} from "./update-dom"
import {reduce, map, prop, propEq, compose, filter, partial, keys, uniq} from "ramda"

function covertToArray(registry) {
  return reduce((accum, key) => {
    accum.push(registry[key])
    return accum
  }, [], keys(registry))
}

function uniqueContainers(registry) {
  return compose(
    uniq,
    map(prop("subtreeContainer"))
  )(covertToArray(registry))
}

function appendToDOM(container, item) {
  if(containerExists(item.selector)) {
    ReactDOM.render((<span>{item.element}</span>), document.querySelector(item.selector))
  }
}

function injectSubtree(registry, elementContainer) {
  compose(
    map(partial(appendToDOM, [elementContainer])),
    filter(propEq("subtreeContainer", elementContainer))
  )(covertToArray(registry))
}

export function renderSubtree(registry) {
  return map(injectSubtree.bind(null, registry), uniqueContainers(registry))
}
