import uuid from "node-uuid"
import React, {PropTypes} from "react"
import {componentRegistry} from "./component-registry"
import {addDefaultContainer} from "./update-dom"
let componentSubtreeRegistry = componentRegistry()

export function unMountComponentWillAppendToBody() {
  componentSubtreeRegistry = componentRegistry()
}

export function componentWillAppendToBody(Component) {

  return class ComponentSubtree extends React.Component {

    static get defaultProps() {
      return {
        subtreeContainer: "#subtree-container",
      }
    }

    static get propTypes() {
      return {
        subtreeContainer: PropTypes.string,
        className: PropTypes.string,
      }
    }
    constructor(props) {
      super(props)
      if(props.subtreeContainer === "#subtree-container") {
        addDefaultContainer()
      }
    }

    componentDidMount() {
      this.uniqueId = uuid.v1()
      this.add()
    }

    componentDidUpdate() {
      this.update()
    }

    componentWillUnmount() {
      componentSubtreeRegistry.deleteElement(this.uniqueId)
    }

    update() {
      componentSubtreeRegistry.updateElement(this.uniqueId,
        <Component
          key={this.uniqueId}
          {...this.props}
        />
      )
    }

    add() {
      componentSubtreeRegistry.addElement(this.uniqueId,
        <Component
          key={this.uniqueId}
          {...this.props}
        />
      , this.props.subtreeContainer)
    }

    render() {
      // NOTE: since this is an append body component, we need to manage the rendering ourselves
      return null
    }
  }
}
