# Quick start

In this section, we will create a minimalistic react app that uses the ORY Editor. Please install [node.js](https://nodejs.org/en/) on your system.

## Installation

This section teaches you to install the editor and include it on your website.

### ReactJS

Our goal is to create a react app. We will use [create-react-app](https://github.com/facebookincubator/create-react-app)
to scaffold it

```
$ npm i -g create-react-app
$ create-react-app .
```

and we will install the editor using npm:

```
$ npm i --save ory-editor
```

To use the editor, you could change *src/components/App.js* to something similar to:

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import the editor
import Editor, { Component as EditorComponent } from 'ory-editor'

var editor = new Editor()

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        
        { /* show the editor */ }
        <EditorComponent editor={editor} />
        
      </div>
    );
  }
}

export default App;
```

### DOM-based

You can use the editor in environments where you do not have access to React, too:

```js
require('./index.css')
var Editor = require('src/editor')

const editor = new Editor()
const elements = document.querySelectorAll('.editable')

editor.renderControls()
for (const element of elements) {
  editor.render(element)
}
```

## Usage

The Editor's core strength is the ability to work with plugins. Plugins are wrapped React components that implement

1. layout logic or
2. content logic.

A content block is a leaf node that contains some type of content, for example video, audio, twitter feed and so on.
A layout block is nestable and may contain children or branches. It can be used to place layout elements such as alert boxes,
spoilers, background images and so on.

### Layout Plugin

```js
import React from 'react'

// layout box plugin
const YellowAlertBox = (props) => (<div style={{ backgorundColor: 'yellow' }} {...props} />);

// content editing plugin
const RemoteImage = ({ src, readOnly, onChange }) => readOnly
  ? <img src={src} />
  : <input type="text" onChange={onChange} value={src} />
```

### Content Plugin
