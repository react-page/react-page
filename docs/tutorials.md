# Tutorials

## ReactJS Example

In this section, we will create a minimalistic react app that uses the ORY Editor.
Before we skip ahead, make sure that [node.js](https://nodejs.org/en/) is installed on your system.

At the moment, the ORY Editor is available only through npm and works best in a ReactJS environment.

### [ReactJS](https://facebook.github.io/react/)

Our goal is to create a ReactJS app that uses the editor.
To scaffold the react app for the purpose of this tutorial, we use [create-react-app](https://github.com/facebookincubator/create-react-app)

```
$ npm i -g create-react-app
$ create-react-app .
```

and install the editor using npm:

```
$ npm i --save ory-editor
```

Next, open the file *src/components/App.js* and include the ORY Editor:

```jsx
import React, { Component } from 'react';
import Editor, { Editable, Controls, createEmptyState } from 'ory-editor'
import logo from './logo.svg';
import './App.css';
import 'ory-editor/dist/styles.css';

// The react-tap-event-plugin is required by material-ui, see:
//  https://github.com/callemall/material-ui#react-tap-event-plugin
require('react-tap-event-plugin')()


const state = createEmptyState()
const editor = new Editor({ /* options */ })

class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>

        <Editable editor={editor} state={state}/>
        <Controls editor={editor}/>
      </div>
    );
  }
}

export default App;
```

That's it, congratulations! You should see something like this now:

![Example app](/images/react-example-app.png)

## Writing Plugins

### Writing a content plugin

Of course, you are not limited to this functionality and can easily write
your own plugins. Plugins have two parts, one plugin definition and a
ReactJS component. A minimal plugin definition looks as followed

```jsx
import React from 'react'

// You are obviously not limited to material-ui, but we really enjoy
// the material-ui svg icons!
import StarIcon from 'material-ui/svg-icons/toggle/star'

// This is the ReactJS component which you can find below this snippet
import InputTextField from './Component'

export default {
  Component: InputTextField,
  IconComponent: <StarIcon />,
  name: 'example/content/input-text-field',
  version: '0.0.1',
  text: 'Input Text Field'
}
```

and a minimalistic plugin example could look like:

```jsx
import React from 'react'

// A callback function for the input field
const onInput = (onChange) => {
  return (e) => {
    // Dispatch the onChange action with the new value
    onChange({
      value: e.target.value
    })
  }
}

const InputTextField = (props) => {
  const {
    state: { value },
    readOnly,
    onChange
  } = props

  // If readOnly is false, it means that we are in edit mode!
  if (!readOnly) {
    return (
      <div className="my-plugin">
        <input
          type="text"
          onChange={onInput(onChange)} value={value} />
      </div>
    )
  }

  // If we are not in edit mode, remove the input field
  return (
    <div className="my-plugin">
      {value}
    </div>
  )
}

export default InputTextField
```

Of course, there are more settings and callbacks available. We encourage checking out the API docs on this topic!

### Writing a layout plugin

Of course, you are not limited to this functionality and can easily write
your own plugins. Plugins have two parts, one plugin definition and a
ReactJS component. A minimal plugin definition looks as followed

```jsx
import React from 'react'

// You are obviously not limited to material-ui, but we really enjoy
// the material-ui svg icons!
import CropSquare from 'material-ui/svg-icons/image/crop-square'

// This is the ReactJS component which you can find below this snippet
import BlackBackgroundPlugin from './Component'

export default {
  Component: BlackBorderPlugin,
  IconComponent: <CropSquare />,
  name: 'example/layout/black-border',
  version: '0.0.1',
  text: 'Black border'
}
```

and a minimalistic component example could look like:

```jsx
import React from 'react'

const BlackBorderPlugin = ({ children }) => (
  <div style={{ border: '1px solid black', padding: '16px' }}>
    {children}
  </div>
)

export default BlackBorderPlugin
```

## Rendering HTML

The `ory-editor-renderer` package ships a lightweight HTML renderer module. You can use it for server-side rendering
and rendering the content client side.

```jsx
import { HTMLRenderer } from 'ory-editor-renderer'

const state = { /* ... */ }
const plugins = {
  layout: [/* ... */],
  content: [/* ... */]
}

const element = document.getElementById('editable')
ReactDOM.render((
  <HTMLRenderer state={content[0]} plugins={plugins}/>
), element)
```

