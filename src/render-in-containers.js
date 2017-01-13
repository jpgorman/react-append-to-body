import React from "react"
import ReactDOM from "react-dom"
import {reduce, map, prop, propEq, compose, filter, partial, keys, uniq} from "ramda"

function covertToArray(collection) {
  return reduce((accum, key) => {
    accum.push(collection[key])
    return accum
  }, [], keys(collection))
}

function uniqueContainers(registry) {
  return compose(
    uniq,
    map(prop("subtreeContainer"))
  )(covertToArray(registry))
}

function appendToDOM(container, content) {
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

export function renderInContainers(registry) {
  return map(injectSubtree.bind(null, registry), uniqueContainers(registry))
}
