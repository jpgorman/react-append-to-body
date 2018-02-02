[![Build Status](https://travis-ci.org/jpgorman/react-append-to-body.svg?branch=master)](https://travis-ci.org/jpgorman/react-append-to-body)
[![npm version](https://badge.fury.io/js/react-append-to-body.svg)](https://badge.fury.io/js/react-append-to-body)

# React higher order component append to body

[React] Higher order component that allows you to attach components to the DOM outside of the main app. Supports __React 16__ and __React 15__  and less, so works with and without ReactDOM.createPortal.

[react]: https://facebook.github.io/react/

# Installation

```sh
npm i react-append-to-body --save
```

# Use

```js
import { componentWillAppendToBody } from "react-append-to-body";

/* Some component that you want to attach to the DOM */
function MyComponent({ children }) {
  return <div className="myClassName">{children}</div>;
}

const AppendedMyComponent = componentWillAppendToBody(MyComponent);

class MyApp extends React.Component {
  render() {
    return (
      <div>
        // this content will be rendered in the main app Some content on my page
        // this content will be rendered outside of the main app
        <AppendedMyComponent>
          The content for my appended component
        </AppendedMyComponent>
      </div>
    );
  }
}
```

```html
/* template */
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width,initial-scale=1" name="viewport">
</head>
<body class="body">
  <div id="my-app"></div>
  <script src="/app.js"></script>
</html>
```

```html
/* output */
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width,initial-scale=1" name="viewport">
</head>
<body class="body">
  <div id="my-app">
    <div>
    // this content will be rendered in the main app
    Some content on my page
    </div>
  </div>
  <div id="append-element-container">
    <div class="myClassName">
      The content for my appended component
    </div>
  </div>
  <script src="/app.js"></script>
</html>
```

### Appending to a named DOM node

```js
const AppendedMyComponent = componentWillAppendToBody(MyComponent);
class MyApp extends React.Component {
  render() {
    return (
      <div>
        Some content on my page // this content will be rendered in the main app
        <AppendedMyComponent
          subtreeContainer={"#my-named-element-to-append-with"}
        >
          The content for my appended component
        </AppendedMyComponent> // this content will be rendered outside of the main
        app
      </div>
    );
  }
}
```

```html
/* template */
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width,initial-scale=1" name="viewport">
</head>
<body class="body">
  <div id="my-app"></div>
  /* dom node that content will be appended to */
  <div id="my-named-element-to-append-with"></div>
  <script src="/app.js"></script>
</html>
```

```html
/* output */
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width,initial-scale=1" name="viewport">
</head>
<body class="body">
  <div id="my-app">
    <div>
    // this content will be rendered in the main app
    Some content on my page
    </div>
  </div>
  <div id="my-named-element-to-append-with">
    <div class="myClassName">
      The content for my appended component
    </div>
  </div>
  <script src="/app.js"></script>
</html>
```

### With Context

If you want to persist Context into the appended component you can do this by simple setting the contextTypes on the appended component.

```js
// using React Router

const Modal = componentWillAppendToBody(Modal);
Modal.contextTypes = {
  router: React.PropTypes.any.isRequired
};
```

## API

`subtreeContainer` a string that should contain a selector that will work with document.querySelector [MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

## Tests

`npm run test`

# Demo

`npm run demo`

Then open up your browser at http://localhost:8777

See [React] docs for examples for your environment.
