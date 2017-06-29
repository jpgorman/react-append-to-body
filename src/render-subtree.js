import React from "react"
import ReactDOM from "react-dom"
import {containerExists} from "./update-dom"

import reduce from "ramda/src/reduce"
import map from "ramda/src/map"
import prop from "ramda/src/prop"
import propEq from "ramda/src/propEq"
import compose from "ramda/src/compose"
import filter from "ramda/src/filter"
import uniq from "ramda/src/uniq"

function partial(fn, args) {
  return fn.bind(null, ...args)
}

function keys(object) {
  return Object.keys(object)
}

function covertToArray(registry) {
  return reduce((accum, key) => {
    accum.push(registry[key])
    return accum
  }, [], keys(registry))
}

function uniqueContainers(registry) {
  return compose(
    uniq,
    map(prop("selector"))
  )(covertToArray(registry))
}

function appendToDOM(selector, arrayOfElements) {
  const container = containerExists(selector)
  if(container) {
    ReactDOM.render((<span>{arrayOfElements}</span>), container)
  }
}

function injectSubtree(registry, selector) {
  compose(
    partial(appendToDOM, [selector]),
    reduce((arrayOfElements, item) => {
      arrayOfElements.push(item.element)
      return arrayOfElements
    }, []),
    filter(propEq("selector", selector))
  )(covertToArray(registry))
}

export function renderSubtree(registry) {
  return map(injectSubtree.bind(null, registry), uniqueContainers(registry))
}
