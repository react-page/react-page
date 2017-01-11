# ![ORY Editor](docs/images/ory-editor-github.jpg)

[![Build Status](https://travis-ci.org/ory-am/editor.svg)](https://travis-ci.org/ory-am/editor)
[![Coverage Status](https://coveralls.io/repos/github/ory-am/editor/badge.svg?branch=master)](https://coveralls.io/github/ory-am/editor?branch=master)
[![Docs Guide](https://img.shields.io/badge/docs-guide-blue.svg)](https://ory-am.gitbooks.io/ory-editor/content/)

[![Join the chat at https://gitter.im/ory-am/hydra](https://img.shields.io/badge/join-chat-00cc99.svg)](https://gitter.im/ory-am/editor)
[![Join newsletter](https://img.shields.io/badge/join-newsletter-00cc99.svg)](http://eepurl.com/bKT3N9)
[![Follow twitter](https://img.shields.io/badge/follow-twitter-00cc99.svg)](https://twitter.com/_aeneasr)
[![Follow GitHub](https://img.shields.io/badge/follow-github-00cc99.svg)](https://github.com/arekkas)
 
The ORY Editor is part of the ORY Content Toolchain, a set of tools helping you to build, distribute and manage awesome content.

*Note:* Please be aware that the ORY Editor is very young, and most features, APIs and docs are new. We try to keep
backwards compatibility as best as we can, but we can not guarantee it. Also, we need your help to find issues and improve
the overall experience, APIs and documentation.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Introduction](#introduction)
- [Quickstart](#quickstart)
- [Documentation](#documentation)
- [Contribute](#contribute)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Head over to our demo at [editor.ory.am](http://editor.ory.am/) and check out what's possible!

## Introduction

We run the [Wikipedia for learning](https://de.serlo.org) for close to a decade now - and used
the lessons learned to enrich the Open Source Community with a technology that improves
the state of content creation on the web. Key features of the ORY Editor are as followed.

* Content is represented as a JSON state. HTML purification / sanitation is no longer required and content-based XSS attacks are much less likely.
* The content state is transformed using [redux](https://github.com/reactjs/redux) and all transformations are well tested.
* Transformations can be replayed at any time. Each key press is a state transform. This allows collaborative editing, global undo/redo and other wizardry.
* Include custom, dynamic components by using the React Plugin API ([example](examples/single-page-site/src/plugins/parallax)) for both content and layout.
* Adapt layout behaviour to your use case *(in development)*

## Quickstart

Currently, the ORY Editor is optimized for usage with React. We will focus on improving the ORY Editor first, an
plan to ship versions that do not require React in the future!

Use npm to install the ORY Editor as followed.

```sh
$ npm install --save ory-editor react-tap-event-plugin
```

The following snippet shows a minimalistic installation of the ORY Editor. We included some [examples](examples/) as well!

```jsx
import React, { Component } from 'react';
import Editor, { Editable, Controls, PluginService, plugins, createEmptyState } from 'ory-editor'

// The ORY Editor currently uses material-ui which requires the react-tap-event-plugin. In the future, material-ui
// will be an optional dependency.
require('react-tap-event-plugin')()
import 'ory-editor/dist/styles.css'

// This could be one of your plugins:
// import HeaderLayoutPlugin from './plugins/layout/Header'

const editor = new Editor({
  plugins: new PluginService([
    // Enable some of the default content plugins here:
    plugins.content.image,
    plugins.content.spacer,
    plugins.content.slate(),
    plugins.content.video,
    plugins.content.divider,
  ], [
    // Provide a list of layout plugins here, for example:
    // HeaderLayoutPlugin
  ])
})

const state = createEmptyState()

class App extends Component {
  render() {
    return (
      <div>
        {/* The controls component displays the toolbar. The editor exposes an API allowing you to build your own! */}
        <Controls editor={editor}/>
        
        {/* This is the editable component. Use the onChange callback to receive all updates */}
        <Editable editor={editor} state={state} onChange={(s) => console.log(s)}/>
      </div>
    );
  }
}

export default App
```

## Examples

We included some [examples](examples/) which are a good starting point if you want to familiarize yourself with the editor.
To run the examples, use one of the following commands.

```
$ npm run start
```

Development builds are unoptimized. To get the best performance you should create a production build as followed

```
$ npm run build
```

and run the web server with:

```
$ npm run serve
```

## Documentation

There is a user guide on [gitbook](https://ory-am.gitbooks.io/ory-editor/content/) available, and you can generate it locally with:

```
$ git clone https://github.com/ory-am/editor.git
$ cd editor
$ npm i -g gitbook-cli
$ gitbook serve -http
```

## Contribute

You need [Node](https://nodejs.org) installed on your system. You can check out this repository with:

```
$ git clone https://github.com/ory-am/editor.git
$ cd editor
```

To run the example, do:

```
$ npm i
$ cd examples
$ cd news-article
$ npm i
$ npm start

Additionally, you can run tests, linting and flow with:

```

# run the tests in watch mode
$ npm run test:watch 

# run eslint in watch mode
$ npm run lint:watch

# run flowtype in watch mode
$ npm run flow:watch
```

## Known issues

We keep track of known issues in the [issues tab](https://github.com/ory-am/editor/issues?q=is%3Aopen+is%3Aissue+label%3Abug).
