import React from "react"
import ReactDOM from "react-dom"
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

function appendToDOM(container, content) {
  // TODO: check container exists in DOM before rendering

  ReactDOM.render((<span>{content}</span>), container)
}

function injectSubtree(registry, elementContainer) {
  compose(
    partial(appendToDOM, [elementContainer]),
    reduce((accum, val) => {
      accum.push(val.content)
      return accum
    }, []),
    filter(propEq("subtreeContainer", elementContainer))
  )(covertToArray(registry))
}

export function renderSubtree(registry) {
  return map(injectSubtree.bind(null, registry), uniqueContainers(registry))
}
