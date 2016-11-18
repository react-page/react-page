# Installing the ORY Editor

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
import logo from './logo.svg';
import './App.css';

// import the Editor and the React components:
import Editor, { Editable, Controls } from 'ory-editor'

// The react-tap-event-plugin is required by material-ui, see:
//  https://github.com/callemall/material-ui#react-tap-event-plugin
require('react-tap-event-plugin')()

// Create an editor config
const editor = new Editor({ /* options */ })

// The editable state
const state = { /* empty document state */ }

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        
        <Editable
          editor={editor}
          state={state}
          onChange={(state) => console.log('got new editable state:', state)}
        />
        <Controls editor={editor} />
      </div>
    );
  }
}

export default App;
```

That's it, congratulations! You should see something like this now:

![Example app](todo)
