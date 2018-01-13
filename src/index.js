import uuidv4 from "uuid/v4";
import React from "react";
import PropTypes from "prop-types";
import { renderSubtree } from "./render-subtree";
import { componentRegistry as registerFactory } from "./component-registry";
import { createContextProvider } from "./context-provider";
import {
  addDefaultContainer,
  unMountContainer,
  containerExists
} from "./update-dom";
const registry = registerFactory(
  { containerExists, unMountContainer },
  renderSubtree
);
let componentSubtreeRegistry = registry();

export function unMountComponentWillAppendToBody() {
  componentSubtreeRegistry = registry();
}

export function componentWillAppendToBody(Component) {
  return class ComponentSubtree extends React.Component {
    static get defaultProps() {
      return {
        subtreeContainer: "#subtree-container",
        context: {}
      };
    }

    static get propTypes() {
      return {
        subtreeContainer: PropTypes.string,
        className: PropTypes.string
      };
    }

    constructor(props, context) {
      super(props);
      this.ContextProvider = createContextProvider(context);
      if (props.subtreeContainer === "#subtree-container") {
        addDefaultContainer();
      }
    }

    componentDidMount() {
      this.uniqueId = uuidv4();
      this.add();
    }

    componentDidUpdate() {
      this.update();
    }

    componentWillUnmount() {
      componentSubtreeRegistry.deleteElement(this.uniqueId);
    }

    getComponent() {
      const ContextProvider = this.ContextProvider;
      return (
        <ContextProvider key={this.uniqueId}>
          <Component {...this.props} />
        </ContextProvider>
      );
    }

    update() {
      componentSubtreeRegistry.updateElement(
        this.uniqueId,
        this.getComponent()
      );
    }

    add() {
      componentSubtreeRegistry.addElement(
        this.uniqueId,
        this.getComponent(),
        this.props.subtreeContainer
      );
    }

    render() {
      // NOTE: since this is an append body component, we need to manage the rendering ourselves
      return null;
    }
  };
}
