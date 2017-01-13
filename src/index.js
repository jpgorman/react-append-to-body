import uuid from "node-uuid"
import React from "react"
import {componentRegistry} from "./component-registry"
let ComponentSubtreeRegistry = componentRegistry()

export function unMountComponentWillAppendToBody() {
  ComponentSubtreeRegistry = componentRegistry()
}

export function componentWillAppendToBody(Component) {

  return class ComponentSubtree extends ComponentSubtreeRegistry {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      this.uniqueId = uuid.v1()
      this.setSubtreeId(this.uniqueId)
      this.add()
    }

    componentDidUpdate() {
      this.update()
    }

    componentWillUnmount() {
      this.deleteElement(this.uniqueId)
    }

    update() {
      this.updateElement(
        <Component
          key={this.uniqueId}
          {...this.props}
        />
      )
    }

    add() {
      this.addElement(
        <Component
          key={this.uniqueId}
          {...this.props}
        />
      )
    }

    render() {
      // NOTE: since this is an append body component, we need to manage the rendering ourselves
      return null
    }
  }
}
