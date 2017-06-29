import uuidv4 from "uuid/v4"
import React from "react"
import PropTypes from "prop-types"
import {renderSubtree} from "./render-subtree"
import {componentRegistry as registerFactory} from "./component-registry"
import {addDefaultContainer, unMountContainer, containerExists} from "./update-dom"
const registry = registerFactory({containerExists, unMountContainer}, renderSubtree)
let componentSubtreeRegistry = registry()

export function unMountComponentWillAppendToBody() {
  componentSubtreeRegistry = registry()
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
      this.uniqueId = uuidv4()
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
