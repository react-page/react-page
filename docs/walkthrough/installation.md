# Installing the ORY Editor

In this section, we will create a minimalistic react app that uses the ORY Editor.
Before we skip ahead, make sure that [node.js](https://nodejs.org/en/) is installed on your system.

The ORY Editor works in all environments, be it via npm, bower or vanilla js. The quick start will teach you to 

### Vanilla JS

You can use the editor in a [vanilla js](http://stackoverflow.com/questions/20435653/what-is-vanillajs) project, simply
include the following tags in your HTML

```html
<html>
  <head>
    <link href="to be done"></link>
  </head>

  <body>
    <div class="editable">the editor content goes here</div>
    
    <script src="to be done"></script>
  </body>
</html>
```

and call it from your javascript file

```js
const editor = new ORY.Editor()
const elements = document.querySelectorAll('.editable')

// renderControls renders the editor controls
editor.renderControls()

// the editor is only able to render one DOM element at a time, which is why we are iterating here:
for (const element of elements) {
  editor.render(element)
}
```

### npm

npm is currently not supported.

### Bower

Bower is currently not supported.



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
