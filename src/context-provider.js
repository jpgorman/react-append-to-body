import React from "react";
import PropTypes from "prop-types";

export function createContextProvider(context) {
  class ContextProvider extends React.Component {
    getChildContext() {
      return context;
    }

    render() {
      return this.props.children;
    }
  }

  ContextProvider.childContextTypes = {};
  Object.keys(context).forEach(key => {
    ContextProvider.childContextTypes[key] = PropTypes.any.isRequired;
  });

  return ContextProvider;
}
