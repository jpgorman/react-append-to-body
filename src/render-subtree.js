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

function appendToDOM(container, arrayOfElements) {
  ReactDOM.render((<span>{arrayOfElements}</span>), container)
}

function injectSubtree(registry, elementContainer) {
  compose(
    partial(appendToDOM, [elementContainer]),
    reduce((arrayOfElements, item) => {
      arrayOfElements.push(item.element)
      return arrayOfElements
    }, []),
    filter(propEq("subtreeContainer", elementContainer))
  )(covertToArray(registry))
}

export function renderSubtree(registry) {
  return map(injectSubtree.bind(null, registry), uniqueContainers(registry))
}
